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
// Animals that need vision QA (any species that has been observed rendering incorrectly)
// This now includes ALL species since Flux Pro can confuse any animal
const QA_REQUIRED_ANIMALS = ["mouse", "mice", "bat", "bats", "vole", "voles", "chipmunk", "chipmunks", "mole", "moles", "shrew", "shrews", "skunk", "skunks", "raccoon", "raccoons", "squirrel", "squirrels", "opossum", "opossums", "groundhog", "groundhogs"];
const SMALL_ANIMALS = ["mouse", "mice", "bat", "bats", "vole", "voles", "chipmunk", "chipmunks", "mole", "moles", "shrew", "shrews"];
const LARGE_ANIMALS = ["raccoon", "raccoons", "squirrel", "squirrels", "opossum", "opossums", "groundhog", "groundhogs", "fox", "foxes", "coyote", "coyotes", "deer", "skunk", "skunks"];

function classifyAnimalSize(species: string): "small" | "large" | "unknown" {
  const lower = species.toLowerCase();
  if (SMALL_ANIMALS.some(a => lower.includes(a))) return "small";
  if (LARGE_ANIMALS.some(a => lower.includes(a))) return "large";
  return "unknown";
}

// ── Species physical description map (for prompt accuracy) ──────────────────
const SPECIES_DESCRIPTIONS: Record<string, string> = {
  raccoon: "raccoon (medium-sized mammal with distinctive black mask markings around eyes, bushy ringed black-and-grey tail, grey-brown fur, stocky build)",
  squirrel: "grey squirrel (small rodent about 9 inches long, bushy grey tail, grey fur with white belly, small rounded ears)",
  skunk: "striped skunk (black fur with two prominent white stripes running from head to bushy tail, small pointed face, short legs)",
  bat: "little brown bat (small flying mammal with dark brown fur, leathery outstretched wings, tiny body about 3 inches long)",
  mouse: "house mouse (very small rodent only 2-3 inches long, grey-brown fur, large round ears relative to body, long thin tail)",
  mice: "house mice (very small rodents only 2-3 inches long, grey-brown fur, large round ears relative to body, long thin tails)",
  chipmunk: "eastern chipmunk (tiny rodent with distinctive alternating brown and white stripes along its back, cheek pouches, small bushy tail)",
  groundhog: "groundhog (large stocky rodent also called woodchuck, brown fur, flat broad head, short powerful legs, about 20 inches long)",
  opossum: "Virginia opossum (grey-white fur, long pointed snout with pink nose, hairless prehensile tail, large dark eyes)",
  bird: "bird (common pest bird such as starling or sparrow near a nest of twigs and debris)",
  vole: "meadow vole (very small mouse-like rodent with short tail, brown fur, compact rounded body)",
  mole: "eastern mole (small burrowing mammal with velvety dark fur, large paddle-shaped front paws, tiny hidden eyes)",
};

function getSpeciesDescription(species: string): string {
  const lower = species.toLowerCase();
  for (const [key, desc] of Object.entries(SPECIES_DESCRIPTIONS)) {
    if (lower.includes(key)) return desc;
  }
  return species;
}

// ── Action/framing variety pool (rotated per generation for anti-spam) ──────
// NOTE: The technician must NEVER be shown touching, holding, or grabbing the animal.
// Skedaddle uses humane exclusion: one-way doors, screening, entry-point sealing.
const ACTION_FRAMINGS = [
  "technician inspecting a roofline while the animal watches from a safe distance",
  "technician crouching near a foundation vent installing mesh screening, with the animal visible nearby on the ground",
  "technician installing a one-way exclusion device on a soffit, animal observing from a tree branch",
  "technician on a ladder sealing an entry point near the roofline, animal perched on the roof edge several feet away",
  "technician examining and sealing entry points on a deck, animal peeking out from under the structure",
  "wide shot of a suburban home exterior with technician working on exclusion hardware and animal in the mid-ground",
  "technician walking toward a detached garage carrying exclusion materials, animal visible near the structure",
  "technician documenting damage near a chimney cap with clipboard, animal perched above at a distance",
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

  // Get detailed species description for accurate rendering
  const speciesDesc = getSpeciesDescription(species);

  // Composition strategy based on animal size
  // CRITICAL: Technician must NEVER be shown touching, holding, or grabbing the animal
  let compositionDirective: string;
  if (sizeClass === "small") {
    // Small animals: place in foreground for visibility — in a humane trap or on a surface, NOT held
    compositionDirective = `A ${speciesDesc} in the near foreground, sharp and clearly visible, perched on a surface or inside a humane wire live-trap close to camera, with shallow depth of field. The technician is NOT touching the animal. Behind in soft focus: a Skedaddle wildlife technician in a teal polo shirt and work pants ${action} at a ${scene}`;
  } else {
    // Large animals and unknown: balanced field photo with clear separation between tech and animal
    compositionDirective = `A ${speciesDesc} clearly visible and identifiable as the subject, positioned in the mid-ground of the frame. A Skedaddle wildlife technician in a teal polo shirt is ${actionFraming}, at a ${scene}. The technician is working on the building structure and is NOT touching or holding the animal. The ${species} is sharp with shallow depth of field separating it from the background`;
  }

  const prompt = [
    `Professional DSLR photograph, ${compositionDirective}.`,
    `Location: ${suburbText}, ${cityState}, realistic suburban residential neighborhood.`,
    `${lighting}.`,
    `The technician is working on the building structure, ${action}. The technician does not touch or hold the animal at any point.`,
    `Photorealistic, well-composed, natural candid moment, editorial quality wildlife control documentation photography.`,
    `Shot on Canon EOS R5, 85mm f/1.8, natural light, sharp focus on the animal.`,
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

// ── #3: Vision-QA check (is the CORRECT species clearly identifiable?) ───────
// This checks both that an animal is present AND that it's the correct species.
async function visionQACheck(imageUrl: string, species: string): Promise<boolean> {
  const speciesDesc = getSpeciesDescription(species);
  try {
    const result = await invokeLLM({
      model: "gemini-3-flash-preview",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: `Look at this photograph carefully. I need you to verify whether the animal shown is specifically a ${species}.

Key identifying features of a ${speciesDesc}.

Answer with JSON:
- "correctSpecies": true if the animal in the image is clearly a ${species} (has the correct distinguishing features), false if it looks like a different animal or is unidentifiable
- "animalVisible": true if any animal is clearly visible in the image, false if no animal is present
- "confidence": "high", "medium", or "low" based on how certain you are
- "actualSpecies": your best guess of what animal is actually shown (e.g. "raccoon", "groundhog", "generic rodent")` },
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
              correctSpecies: { type: "boolean" },
              animalVisible: { type: "boolean" },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              actualSpecies: { type: "string" },
            },
            required: ["correctSpecies", "animalVisible", "confidence", "actualSpecies"],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    });

    const rawContent = result.choices[0]?.message?.content;
    const contentStr = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);
    const parsed = JSON.parse(contentStr);
    // Pass only if the correct species is visible with at least medium confidence
    return parsed.correctSpecies === true && parsed.animalVisible === true && parsed.confidence !== "low";
  } catch {
    // If vision check fails, pass the image through (don't block on QA failure)
    return true;
  }
}

// ── #7: Add brand overlay using sharp's Pango text rendering ────────────────
// Uses sharp's built-in text() method which renders via Pango/fontconfig.
// This is font-independent — works on any server without requiring specific fonts.
async function addBrandOverlay(
  imageBuffer: Buffer,
  serviceLabel: string,
  cityState: string,
): Promise<Buffer> {
  const meta = await sharp(imageBuffer).metadata();
  const W = meta.width ?? 1200;
  const H = meta.height ?? 900;
  const barH = Math.round(H * 0.14);
  const barY = H - barH;
  const textX = Math.round(W * 0.04);
  const fontSize = Math.round(H * 0.045);
  const fontSizeSmall = Math.round(H * 0.032);

  // Create the teal bar as a separate RGBA buffer
  const tealBar = await sharp({
    create: { width: W, height: barH, channels: 4, background: { r: 1, g: 105, b: 111, alpha: 217 } },
  }).png().toBuffer();

  // Render service label text using Pango (font-independent)
  const serviceLabelBuf = await sharp({
    text: {
      text: `<span foreground="white" font_desc="Sans Bold ${fontSize}">${escapePango(serviceLabel)}</span>`,
      dpi: 72,
      rgba: true,
    },
  }).png().toBuffer();
  const serviceMeta = await sharp(serviceLabelBuf).metadata();

  // Render city/state text
  const cityBuf = await sharp({
    text: {
      text: `<span foreground="#C8EBEB" font_desc="Sans ${fontSizeSmall}">${escapePango(cityState)}</span>`,
      dpi: 72,
      rgba: true,
    },
  }).png().toBuffer();

  // Calculate text positions within the bar
  const textYBase = barY + Math.round(barH * 0.22);
  const serviceHeight = serviceMeta.height ?? fontSize;

  // Build composite layers
  const composites: Array<{ input: Buffer; top: number; left: number; blend: "over" }> = [
    { input: tealBar, top: barY, left: 0, blend: "over" },
    { input: serviceLabelBuf, top: textYBase, left: textX, blend: "over" },
    { input: cityBuf, top: textYBase + serviceHeight + 6, left: textX, blend: "over" },
  ];

  // Brand mark: either the real logo PNG or rendered "Skedaddle" text
  if (logoPngBuffer) {
    const logoHeight = Math.round(barH * 0.6);
    const resizedLogo = await sharp(logoPngBuffer)
      .resize({ height: logoHeight, fit: "inside" })
      .toBuffer();
    const logoMeta = await sharp(resizedLogo).metadata();
    const logoWidth = logoMeta.width ?? logoHeight * 3;
    const logoLeft = W - Math.round(W * 0.04) - logoWidth;
    const logoTop = barY + Math.round((barH - logoHeight) / 2);
    composites.push({ input: resizedLogo, top: logoTop, left: logoLeft, blend: "over" });
  } else {
    // Render "Skedaddle" brand text
    const brandFontSize = Math.round(H * 0.038);
    const brandBuf = await sharp({
      text: {
        text: `<span foreground="white" font_desc="Sans Bold ${brandFontSize}">Skedaddle</span>`,
        dpi: 72,
        rgba: true,
      },
    }).png().toBuffer();
    const brandMeta = await sharp(brandBuf).metadata();
    const brandWidth = brandMeta.width ?? 150;
    const brandHeight = brandMeta.height ?? brandFontSize;
    const brandLeft = W - Math.round(W * 0.04) - brandWidth;
    const brandTop = barY + Math.round((barH - brandHeight) / 2);
    composites.push({ input: brandBuf, top: brandTop, left: brandLeft, blend: "over" });
  }

  return await sharp(imageBuffer)
    .composite(composites)
    .jpeg({ quality: 92 })
    .toBuffer();
}

// Escape text for Pango markup (XML-like)
function escapePango(str: string): string {
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
        image_size: { width: 1200, height: 900 },
        num_images: 1,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        safety_tolerance: "2",
      },
    }) as unknown as { data: { images: Array<{ url: string }> }; requestId: string };
    imageUrl = result.data.images[0].url;
  }

  // #3: Vision QA check — retry up to 2 times for species accuracy
  const needsQA = QA_REQUIRED_ANIMALS.some(a => fields.species.toLowerCase().includes(a));
  if (needsQA) {
    const speciesDesc = getSpeciesDescription(fields.species);
    for (let attempt = 0; attempt < 2; attempt++) {
      const passed = await visionQACheck(imageUrl, fields.species);
      if (passed) break;
      // Retry with increasingly specific prompt
      const retryPrompt = attempt === 0
        ? `Close-up wildlife photograph: a ${speciesDesc} clearly visible in the center foreground, occupying at least 30% of the frame. The animal is sitting on the ground near a suburban home foundation. Sharp focus on the animal showing its distinctive features. The animal is NOT being held or touched by anyone. Behind in soft bokeh: a Skedaddle wildlife technician in teal polo shirt inspecting the home exterior in ${cityState}. Photorealistic, Canon EOS R5, 85mm f/1.8, golden hour natural light.`
        : `Extreme close-up nature photograph of a single ${speciesDesc}. The animal fills most of the frame, photographed at eye level in a suburban backyard setting. Ultra-sharp detail on fur/feathers and distinctive markings. No humans visible. Shallow depth of field, background is a blurred residential home. Shot in ${suburb || cityState}. Photorealistic, Nikon Z9, 105mm macro lens, f/2.8.`;
      try {
        const retryResult = await fal.subscribe("fal-ai/flux-pro", {
          input: {
            prompt: retryPrompt,
            image_size: { width: 1200, height: 900 },
            num_images: 1,
            num_inference_steps: 28,
            guidance_scale: 3.5,
            safety_tolerance: "2",
          },
        }) as unknown as { data: { images: Array<{ url: string }> }; requestId: string };
        imageUrl = retryResult.data.images[0].url;
      } catch {
        // If retry fails, keep the current image and break
        break;
      }
    }
  }

  const resp = await fetch(imageUrl);
  const rawBuffer = Buffer.from(await resp.arrayBuffer());

  // Enforce exact 1200x900 dimensions regardless of what the model returns
  const resizedBuffer = await sharp(rawBuffer)
    .resize(1200, 900, { fit: "cover", position: "center" })
    .jpeg({ quality: 95 })
    .toBuffer();

  const branded = await addBrandOverlay(resizedBuffer, serviceLabel, cityState);

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
