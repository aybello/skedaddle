import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { fal } from "@fal-ai/client";
import { invokeLLM } from "./_core/llm";
import sharp from "sharp";
import { storagePut } from "./storage";
import { createHash } from "crypto";
import pLimit from "p-limit";
import { existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Logo PNG loading (module scope, loaded once) ────────────────────────────
// Place the real Skedaddle logo at: server/assets/skedaddle-logo.png
// Must be a transparent PNG. It will be composited into the brand bar.
const __filename_local = fileURLToPath(import.meta.url);
const __dirname_local = dirname(__filename_local);
const LOGO_PATH = resolve(__dirname_local, "assets", "skedaddle-logo.png");
let logoPngBuffer: Buffer | null = null;
try {
  if (existsSync(LOGO_PATH)) {
    logoPngBuffer = readFileSync(LOGO_PATH);
  }
} catch {
  // Logo not available — will use text fallback
}

// ── Territory data ────────────────────────────────────────────────────────────
export const TERRITORIES: Record<string, { label: string; cityState: string; suburbs: string[] }> = {
  milwaukee:          { label: "Milwaukee, WI",        cityState: "Milwaukee WI",        suburbs: ["Waukesha","Brookfield","New Berlin","Hartland","Wauwatosa","Greenfield","Pewaukee","West Allis","Franklin","Delafield","Oconomowoc","Menomonee Falls"] },
  madison:            { label: "Madison, WI",           cityState: "Madison WI",           suburbs: ["Middleton","Verona","Fitchburg","Waunakee","Oregon","McFarland","Stoughton","Sun Prairie","Mazomanie","Monona"] },
  hamilton:           { label: "Hamilton, ON",           cityState: "Hamilton ON",           suburbs: ["Ancaster","Dundas","Stoney Creek","Waterdown","Grimsby","Binbrook","Caledonia","Flamborough","Dunnville","Hagersville"] },
  durham:             { label: "Durham Region, ON",     cityState: "Durham Region ON",     suburbs: ["Whitby","Ajax","Pickering","Oshawa","Bowmanville","Port Perry","Brooklin","Courtice","Uxbridge","Scugog"] },
  minneapolis:        { label: "Minneapolis, MN",       cityState: "Minneapolis MN",       suburbs: ["Eden Prairie","Minnetonka","Bloomington","Plymouth","Edina","Maple Grove","Woodbury","Burnsville","Eagan","Lakeville"] },
  coquitlam:          { label: "Coquitlam, BC",         cityState: "Coquitlam BC",         suburbs: ["Port Moody","Burnaby","New Westminster","Maple Ridge","Pitt Meadows","Port Coquitlam","Langley","Surrey","Abbotsford","Mission"] },
  baltimore:          { label: "Baltimore, MD",         cityState: "Baltimore MD",         suburbs: ["Towson","Catonsville","Ellicott City","Pikesville","Timonium","Owings Mills","Parkville","Dundalk","Rosedale","Essex"] },
  "atlanta-north":    { label: "Atlanta North, GA",    cityState: "Atlanta GA",           suburbs: ["Alpharetta","Roswell","Marietta","Sandy Springs","Dunwoody","Johns Creek","Smyrna","Kennesaw","Woodstock","Canton"] },
  ottawa:             { label: "Ottawa, ON",            cityState: "Ottawa ON",            suburbs: ["Kanata","Barrhaven","Orleans","Nepean","Gloucester","Stittsville","Manotick","Riverside South","Rockcliffe","Aylmer"] },
  montreal:           { label: "Montreal, QC",          cityState: "Montreal QC",          suburbs: ["Laval","Longueuil","Brossard","Saint-Lambert","Verdun","Westmount","Outremont","Pointe-Claire","Dollard-des-Ormeaux","Beaconsfield"] },
  london:             { label: "London, ON",            cityState: "London ON",            suburbs: ["Byron","Westmount","Lambeth","Komoka","Strathroy","St. Thomas","Dorchester","Ingersoll","Tillsonburg","Woodstock"] },
  denver:             { label: "Denver, CO",            cityState: "Denver CO",            suburbs: ["Aurora","Lakewood","Arvada","Westminster","Thornton","Centennial","Highlands Ranch","Parker","Littleton","Englewood"] },
  orangeville:        { label: "Orangeville, ON",       cityState: "Orangeville ON",       suburbs: ["Shelburne","Grand Valley","Mono","Amaranth","East Garafraxa"] },
  columbus:           { label: "Columbus, OH",          cityState: "Columbus OH",          suburbs: ["Dublin","Westerville","Gahanna","Hilliard","Grove City","Pickerington","Reynoldsburg","Powell","Lewis Center","New Albany"] },
  pittsburgh:         { label: "Pittsburgh, PA",        cityState: "Pittsburgh PA",        suburbs: ["Mt. Lebanon","Bethel Park","Upper St. Clair","Peters Township","Cranberry Township","Wexford","Monroeville","Ross Township","McCandless","Hampton Township"] },
  okanagan:           { label: "Okanagan, BC",          cityState: "Kelowna BC",           suburbs: ["West Kelowna","Penticton","Vernon","Summerland","Peachland"] },
  windsor:            { label: "Windsor, ON",           cityState: "Windsor ON",           suburbs: ["LaSalle","Tecumseh","Lakeshore","Amherstburg","Essex","Kingsville","Leamington","Chatham","Tilbury","Wallaceburg"] },
  "barrie-north":     { label: "Barrie North, ON",     cityState: "Barrie ON",            suburbs: ["Innisfil","Angus","Orillia","Midland","Penetanguishene","Collingwood","Wasaga Beach","Alliston","Bradford","Newmarket"] },
  "maryland-central": { label: "Maryland Central",     cityState: "Annapolis MD",         suburbs: ["Severna Park","Arnold","Crofton","Odenton","Pasadena","Glen Burnie","Millersville","Gambrills","Davidsonville","Edgewater"] },
};

// ── Utility: content hash for dedup and collision-safe filenames ─────────────
function contentHash8(title: string, body: string, territory: string, suburb: string): string {
  return createHash("sha256")
    .update(`${title}|${body}|${territory}|${suburb}`)
    .digest("hex")
    .slice(0, 8);
}

// ── Utility: ASCII-safe slug ────────────────────────────────────────────────
function toAsciiSlug(s: string, maxLen = 40): string {
  return s.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, maxLen);
}

// ── Species size classification ─────────────────────────────────────────────
// Animals that need vision QA (small or hard-to-render consistently)
const QA_REQUIRED_ANIMALS = ["mouse", "mice", "bat", "bats", "vole", "voles", "chipmunk", "chipmunks", "mole", "moles", "shrew", "shrews", "skunk", "skunks"];
const SMALL_ANIMALS = ["mouse", "mice", "bat", "bats", "vole", "voles", "chipmunk", "chipmunks", "mole", "moles", "shrew", "shrews"];
const LARGE_ANIMALS = ["raccoon", "raccoons", "squirrel", "squirrels", "opossum", "opossums", "groundhog", "groundhogs", "fox", "foxes", "coyote", "coyotes", "deer", "skunk", "skunks"];

function classifyAnimalSize(species: string): "small" | "large" | "unknown" {
  const lower = species.toLowerCase();
  if (SMALL_ANIMALS.some(a => lower.includes(a))) return "small";
  if (LARGE_ANIMALS.some(a => lower.includes(a))) return "large";
  return "unknown";
}

// ── Action/framing variety pool (rotated per generation for anti-spam) ──────
const ACTION_FRAMINGS = [
  "technician inspecting a roofline with the animal nearby",
  "technician crouching near a foundation vent with the animal visible",
  "technician setting up a one-way exclusion device, animal watching from a distance",
  "technician on a ladder near soffit with the animal on the roof edge",
  "technician examining entry points on a deck with the animal peeking out",
  "wide shot of a suburban home exterior with technician working and animal in mid-ground",
  "technician walking toward a detached garage, animal visible near the structure",
  "technician documenting damage near a chimney cap with the animal perched above",
];

let actionFramingCounter = 0;
function getNextActionFraming(): string {
  const framing = ACTION_FRAMINGS[actionFramingCounter % ACTION_FRAMINGS.length];
  actionFramingCounter++;
  return framing;
}

// ── #4+#5+#6: Structured-intermediate prompt builder ────────────────────────
// Step 1: LLM extracts structured fields from post content
// Step 2: Deterministic template assembles the final Flux Pro prompt
interface ExtractedFields {
  species: string;
  sizeClass: "small" | "large" | "unknown";
  action: string;
  scene: string;
  season: string;
  serviceLabel: string;
}

async function extractFieldsFromPost(
  title: string,
  body: string,
  territory: string,
  suburb: string,
): Promise<ExtractedFields> {
  const territoryData = TERRITORIES[territory];
  const cityState = territoryData?.cityState ?? territory;
  const suburbText = suburb || (territoryData?.suburbs[0] ?? cityState);

  const systemPrompt = `You are a wildlife service data extractor for Skedaddle Humane Wildlife Control.
Given a GBP post title and body, extract structured fields. Do not write a prompt — just extract facts.

The post is about a job in ${suburbText}, ${cityState}.

Return JSON with these fields:
- species: the primary animal mentioned (e.g. "raccoon", "squirrel", "bat", "mouse")
- sizeClass: "small" if the animal is tiny (mouse, bat, vole, chipmunk, mole, shrew), "large" if bigger (raccoon, squirrel, skunk, opossum, groundhog), or "unknown"
- action: what the technician is doing (e.g. "installing one-way door on soffit", "sealing entry points on roofline", "removing nest from attic")
- scene: brief description of the setting (e.g. "two-story colonial home with mature trees", "ranch-style house with attached garage")
- season: the season implied by the post (spring, summer, fall, winter) — infer from context clues
- serviceLabel: short label for the service (e.g. "Raccoon Removal", "Squirrel Exclusion", "Bat Exclusion", "Mouse Removal")`;

  const result = await invokeLLM({
    model: "claude-haiku-4-5",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Title: ${title}\n\nBody: ${body || "(no body provided)"}` },
    ],
    responseFormat: {
      type: "json_schema" as const,
      json_schema: {
        name: "extracted_fields",
        schema: {
          type: "object",
          properties: {
            species: { type: "string" },
            sizeClass: { type: "string", enum: ["small", "large", "unknown"] },
            action: { type: "string" },
            scene: { type: "string" },
            season: { type: "string" },
            serviceLabel: { type: "string" },
          },
          required: ["species", "sizeClass", "action", "scene", "season", "serviceLabel"],
          additionalProperties: false,
        },
        strict: true,
      },
    },
  });

  try {
    const rawContent = result.choices[0]?.message?.content;
    const contentStr = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);
    const parsed = JSON.parse(contentStr);
    // Validate/override sizeClass using our known list
    const correctedSize = classifyAnimalSize(parsed.species);
    return {
      species: parsed.species || "wildlife",
      sizeClass: correctedSize !== "unknown" ? correctedSize : (parsed.sizeClass || "unknown"),
      action: parsed.action || "performing wildlife exclusion",
      scene: parsed.scene || "suburban residential home",
      season: parsed.season || "summer",
      serviceLabel: parsed.serviceLabel || "Wildlife Removal",
    };
  } catch {
    return {
      species: "wildlife",
      sizeClass: "unknown",
      action: "performing wildlife exclusion",
      scene: "suburban residential home",
      season: "summer",
      serviceLabel: "Wildlife Removal",
    };
  }
}

// Step 2: Deterministic template builds the final prompt from extracted fields
function buildPromptFromFields(
  fields: ExtractedFields,
  cityState: string,
  suburbText: string,
): string {
  const { species, sizeClass, action, scene, season } = fields;
  const actionFraming = getNextActionFraming();

  // Season-specific lighting
  const seasonLighting: Record<string, string> = {
    spring: "soft overcast spring light, fresh green foliage",
    summer: "warm golden-hour summer light, lush green trees",
    fall: "warm autumn light, colorful fall foliage",
    winter: "cool crisp winter light, bare branches",
  };
  const lighting = seasonLighting[season.toLowerCase()] || seasonLighting.summer;

  // Composition strategy based on animal size
  let compositionDirective: string;
  if (sizeClass === "small") {
    // Small animals: place in foreground for visibility at 1024px
    compositionDirective = `A ${species} in the near foreground, sharp and clearly visible (held in a gloved hand, in a humane live trap, or perched on a surface close to camera), with shallow depth of field. Behind in soft focus: a Skedaddle technician in a teal polo shirt ${action} at a ${scene}`;
  } else {
    // Large animals and unknown: balanced field photo
    compositionDirective = `A ${species} clearly visible and identifiable as the subject, positioned in the mid-ground of the frame. A Skedaddle technician in a teal polo shirt is ${actionFraming}, at a ${scene}. The ${species} is sharp with shallow depth of field separating it from the background`;
  }

  const prompt = [
    `Professional DSLR photograph, ${compositionDirective}.`,
    `Location: ${suburbText}, ${cityState}, realistic suburban residential neighborhood.`,
    `${lighting}.`,
    `The technician is naturally ${action}.`,
    `Photorealistic, well-composed, natural candid moment, editorial quality wildlife control documentation photography.`,
    `Shot on Canon EOS R5, 85mm f/1.8, natural light.`,
  ].join(" ");

  return prompt;
}

// ── Combined prompt builder (replaces old buildPromptFromPost) ───────────────
async function buildPrompt(
  title: string,
  body: string,
  territory: string,
  suburb: string,
): Promise<{ prompt: string; serviceLabel: string; fields: ExtractedFields }> {
  const territoryData = TERRITORIES[territory];
  const cityState = territoryData?.cityState ?? territory;
  const suburbText = suburb || (territoryData?.suburbs[0] ?? cityState);

  const fields = await extractFieldsFromPost(title, body, territory, suburb);
  const prompt = buildPromptFromFields(fields, cityState, suburbText);

  return { prompt, serviceLabel: fields.serviceLabel, fields };
}

// ── #3: Vision-QA check (is the animal clearly identifiable?) ───────────────
async function visionQACheck(imageUrl: string, species: string): Promise<boolean> {
  try {
    const result = await invokeLLM({
      model: "gemini-3-flash-preview",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: `Look at this photograph. Is a ${species} clearly identifiable as a subject in this image? Answer with JSON: { "animalVisible": true/false, "confidence": "high"/"medium"/"low" }. The animal does not need to dominate the frame, but it must be recognizable as a ${species} to a viewer.` },
          { type: "image_url", image_url: { url: imageUrl, detail: "auto" } },
        ],
      }],
      responseFormat: {
        type: "json_schema" as const,
        json_schema: {
          name: "vision_qa",
          schema: {
            type: "object",
            properties: {
              animalVisible: { type: "boolean" },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
            },
            required: ["animalVisible", "confidence"],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    });

    const rawContent = result.choices[0]?.message?.content;
    const contentStr = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);
    const parsed = JSON.parse(contentStr);
    // Pass if animal is visible with at least medium confidence
    return parsed.animalVisible === true && parsed.confidence !== "low";
  } catch {
    // If vision check fails, pass the image through (don't block on QA failure)
    return true;
  }
}

// ── #7: Add brand overlay using sharp + SVG ─────────────────────────────────
// Logo overlay: composites the real PNG logo if available, otherwise uses text.
async function addBrandOverlay(
  imageBuffer: Buffer,
  serviceLabel: string,
  cityState: string,
): Promise<Buffer> {
  const meta = await sharp(imageBuffer).metadata();
  const W = meta.width ?? 1024;
  const H = meta.height ?? 768;
  const barH = Math.round(H * 0.14);
  const barY = H - barH;
  const textX = Math.round(W * 0.04);
  const textY = barY + Math.round(barH * 0.18);
  const fontSize = Math.round(H * 0.045);
  const fontSizeSmall = Math.round(H * 0.032);

  // Build the SVG overlay (teal bar + service label + city)
  // Brand mark is either the logo PNG (composited separately) or text fallback
  const brandTextSvg = logoPngBuffer
    ? "" // Logo will be composited as a separate layer
    : (() => {
        const brandFontSize = Math.round(H * 0.038);
        const brandX = W - Math.round(W * 0.04);
        const brandY = barY + Math.round(barH * 0.55);
        return `<text x="${brandX}" y="${brandY}" font-family="Arial, sans-serif" font-size="${brandFontSize}" font-weight="bold" fill="white" text-anchor="end">Skedaddle</text>`;
      })();

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="${barY}" width="${W}" height="${barH}" fill="rgba(1,105,111,0.85)" rx="0"/>
    <text x="${textX}" y="${textY + fontSize}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="white">${escapeXml(serviceLabel)}</text>
    <text x="${textX}" y="${textY + fontSize + fontSizeSmall + 4}" font-family="Arial, sans-serif" font-size="${fontSizeSmall}" fill="rgba(200,235,235,0.9)">${escapeXml(cityState)}</text>
    ${brandTextSvg}
  </svg>`;

  // If real logo PNG is available, resize and composite it alongside the SVG overlay
  if (logoPngBuffer) {
    const logoHeight = Math.round(barH * 0.6);
    const resizedLogo = await sharp(logoPngBuffer)
      .resize({ height: logoHeight, fit: "inside" })
      .toBuffer();
    const logoMeta = await sharp(resizedLogo).metadata();
    const logoWidth = logoMeta.width ?? logoHeight * 3;
    const logoLeft = W - Math.round(W * 0.04) - logoWidth;
    const logoTop = barY + Math.round((barH - logoHeight) / 2);
    return await sharp(imageBuffer)
      .composite([
        { input: Buffer.from(svg), blend: "over" },
        { input: resizedLogo, top: logoTop, left: logoLeft, blend: "over" },
      ])
      .jpeg({ quality: 92 })
      .toBuffer();
  }

  return await sharp(imageBuffer)
    .composite([{ input: Buffer.from(svg), blend: "over" }])
    .jpeg({ quality: 92 })
    .toBuffer();
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ── Generate single image (with vision QA retry) ────────────────────────────
async function generateSingleImage(
  title: string,
  body: string,
  territory: string,
  suburb: string,
): Promise<{ url: string; filename: string; serviceLabel: string; prompt: string }> {
  const falKey = process.env.FAL_KEY;
  if (!falKey) throw new Error("FAL_KEY not configured");

  fal.config({ credentials: falKey });

  const territoryData = TERRITORIES[territory];
  const cityState = territoryData?.cityState ?? territory;

  const { prompt, serviceLabel, fields } = await buildPrompt(title, body, territory, suburb);

  // Generate image via fal.ai Flux Pro (using v1.1 if available, fallback to base)
  const falModel = "fal-ai/flux-pro/v1.1";
  let imageUrl: string;

  try {
    const result = await (fal.subscribe as Function)(falModel, {
      input: {
        prompt,
        image_size: { width: 1200, height: 900 },
        num_images: 1,
        guidance_scale: 3.5,
        safety_tolerance: "2",
      },
    }) as { data: { images: Array<{ url: string }> }; requestId: string };
    imageUrl = result.data.images[0].url;
  } catch {
    // Fallback to base flux-pro if v1.1 not available
    const result = await fal.subscribe("fal-ai/flux-pro", {
      input: {
        prompt,
        image_size: "landscape_4_3",
        num_images: 1,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        safety_tolerance: "2",
      },
    }) as unknown as { data: { images: Array<{ url: string }> }; requestId: string };
    imageUrl = result.data.images[0].url;
  }

  // #3: Vision QA check — retry once for small/hard-to-render animals if species not visible
  const needsQA = QA_REQUIRED_ANIMALS.some(a => fields.species.toLowerCase().includes(a));
  if (needsQA) {
    const passed = await visionQACheck(imageUrl, fields.species);
    if (!passed) {
      // Retry with a strengthened prompt emphasizing the animal
      const retryPrompt = `Close-up photograph: a ${fields.species} clearly visible in the foreground, held in a gloved hand or in a humane live trap, sharp focus on the animal. Behind in soft bokeh: a Skedaddle technician in teal polo at a suburban home in ${cityState}. Photorealistic, Canon EOS R5, 85mm f/1.8, natural light. Shot on location in ${suburb || cityState}.`;
      try {
        const retryResult = await fal.subscribe("fal-ai/flux-pro", {
          input: {
            prompt: retryPrompt,
            image_size: "landscape_4_3",
            num_images: 1,
            num_inference_steps: 28,
            guidance_scale: 3.5,
            safety_tolerance: "2",
          },
        }) as unknown as { data: { images: Array<{ url: string }> }; requestId: string };
        imageUrl = retryResult.data.images[0].url;
      } catch {
        // If retry fails, use the original image
      }
    }
  }

  const resp = await fetch(imageUrl);
  const rawBuffer = Buffer.from(await resp.arrayBuffer());
  const branded = await addBrandOverlay(rawBuffer, serviceLabel, cityState);

  // #2: Collision-safe filename with content hash
  const hash8 = contentHash8(title, body, territory, suburb);
  const slug = toAsciiSlug(title, 30);
  const safeTerritory = toAsciiSlug(territory, 20);
  const filename = `${safeTerritory}_${slug}_${hash8}.jpg`;
  const storageKey = `gbp-images/${filename}`;
  const { url: storedUrl } = await storagePut(storageKey, branded, "image/jpeg");

  return { url: storedUrl, filename, serviceLabel, prompt };
}

// ── In-memory job store for bulk generation ─────────────────────────────────
interface BulkJob {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  total: number;
  completed: number;
  results: Array<{
    index: number;
    url: string;
    filename: string;
    serviceLabel: string;
    prompt: string;
    success: boolean;
    error?: string;
  }>;
  createdAt: number;
}

const jobStore = new Map<string, BulkJob>();

// Clean up old jobs (older than 1 hour)
function cleanupOldJobs() {
  const oneHourAgo = Date.now() - 3600_000;
  jobStore.forEach((job, id) => {
    if (job.createdAt < oneHourAgo) jobStore.delete(id);
  });
}

// ── tRPC Router ───────────────────────────────────────────────────────────────
export const gbpImageRouter = router({
  getTerritories: publicProcedure.query(() => {
    return Object.entries(TERRITORIES).map(([id, t]) => ({
      id,
      label: t.label,
      suburbs: t.suburbs,
    }));
  }),

  getSuburbs: publicProcedure
    .input(z.object({ territoryId: z.string() }))
    .query(({ input }) => {
      const t = TERRITORIES[input.territoryId];
      return t ? t.suburbs : [];
    }),

  // Single post → single image
  generateSingle: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      body: z.string().default(""),
      territory: z.string().min(1),
      suburb: z.string().default(""),
    }))
    .mutation(async ({ input }) => {
      const result = await generateSingleImage(
        input.title,
        input.body,
        input.territory,
        input.suburb,
      );
      return result;
    }),

  // #1: Bulk generation — submit job and return jobId immediately
  generateBulk: publicProcedure
    .input(z.object({
      posts: z.array(z.object({
        title: z.string().min(1),
        body: z.string().default(""),
        territory: z.string().min(1),
        suburb: z.string().default(""),
      })).min(1).max(50),
    }))
    .mutation(async ({ input }) => {
      cleanupOldJobs();

      const jobId = createHash("sha256")
        .update(JSON.stringify(input.posts) + Date.now())
        .digest("hex")
        .slice(0, 16);

      const job: BulkJob = {
        id: jobId,
        status: "running",
        total: input.posts.length,
        completed: 0,
        results: [],
        createdAt: Date.now(),
      };
      jobStore.set(jobId, job);

      // Process concurrently with p-limit (6 concurrent)
      const limit = pLimit(6);

      // Fire and don't await — return jobId immediately
      const processAll = async () => {
        const tasks = input.posts.map((post, i) =>
          limit(async () => {
            // Idempotency: check if already generated (same content hash)
            const hash = contentHash8(post.title, post.body, post.territory, post.suburb);
            const existingResult = job.results.find(r =>
              r.filename.includes(hash) && r.success
            );
            if (existingResult) {
              job.completed++;
              return;
            }

            try {
              const result = await generateSingleImage(
                post.title,
                post.body,
                post.territory,
                post.suburb,
              );
              job.results.push({
                index: i,
                url: result.url,
                filename: result.filename,
                serviceLabel: result.serviceLabel,
                prompt: result.prompt,
                success: true,
              });
            } catch (err) {
              job.results.push({
                index: i,
                url: "",
                filename: "",
                serviceLabel: "",
                prompt: "",
                success: false,
                error: String(err),
              });
            }
            job.completed++;
          })
        );

        await Promise.all(tasks);
        job.status = job.results.some(r => !r.success) ? "completed" : "completed";
        // Sort results by index for consistent ordering
        job.results.sort((a, b) => a.index - b.index);
      };

      // Start processing in background (don't await)
      processAll().catch(() => {
        job.status = "failed";
      });

      return { jobId };
    }),

  // #1: Poll job status
  getJobStatus: publicProcedure
    .input(z.object({ jobId: z.string() }))
    .query(({ input }) => {
      const job = jobStore.get(input.jobId);
      if (!job) {
        return { found: false as const, status: "not_found" as const, total: 0, completed: 0, results: [] };
      }
      return {
        found: true as const,
        status: job.status,
        total: job.total,
        completed: job.completed,
        results: job.results,
      };
    }),
});
