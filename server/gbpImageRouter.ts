import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { fal } from "@fal-ai/client";
import { invokeLLM } from "./_core/llm";
import sharp from "sharp";
import { storagePut } from "./storage";

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

// ── Build image prompt from post content using LLM ───────────────────────────
async function buildPromptFromPost(
  title: string,
  body: string,
  territory: string,
  suburb: string,
): Promise<{ prompt: string; serviceLabel: string }> {
  const territoryData = TERRITORIES[territory];
  const cityState = territoryData?.cityState ?? territory;
  const suburbText = suburb || (territoryData?.suburbs[0] ?? cityState);

  const systemPrompt = `You are a professional image prompt engineer for Skedaddle Humane Wildlife Control.
Given a GBP post title and body, generate a highly specific, photorealistic image generation prompt.

Rules:
- The ANIMAL must be the visual centrepiece of the image — large, close-up, clearly identifiable, filling at least 25% of the frame
- For small animals (mice, bats, chipmunks, skunks): show the animal held in a gloved hand OR in a live trap in the foreground, very close to the camera lens
- For large animals (raccoons, squirrels, groundhogs): show the animal face-on or mid-action (climbing, peeking, being guided out)
- Include a Skedaddle technician in a TEAL uniform as a supporting element (not the main focus)
- Set the scene in ${suburbText}, ${cityState}
- The scene must match the post content exactly (species, situation, season if mentioned)
- Style: photorealistic, professional DSLR photography, shallow depth of field, warm natural light
- NEVER generate an image that only shows damage, droppings, or an empty environment — the animal MUST be visible
- End with: "no text in image"
- Also return a short service label (e.g. "Raccoon Removal", "Squirrel Exclusion", "Bat Exclusion", "Mouse Removal")

Respond with JSON: { "prompt": "...", "serviceLabel": "..." }`;

  const result = await invokeLLM({
    model: "claude-3-5-haiku",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Title: ${title}\n\nBody: ${body || "(no body provided)"}` },
    ],
    responseFormat: {
      type: "json_schema" as const,
      json_schema: {
        name: "image_prompt",
        schema: {
          type: "object",
          properties: {
            prompt: { type: "string" },
            serviceLabel: { type: "string" },
          },
          required: ["prompt", "serviceLabel"],
        },
        strict: true,
      },
    },
  });

  try {
    const rawContent = result.choices[0]?.message?.content;
    const contentStr = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);
    const parsed = JSON.parse(contentStr);
    return { prompt: parsed.prompt, serviceLabel: parsed.serviceLabel };
  } catch {
    // Fallback if JSON parse fails
    return {
      prompt: `A Skedaddle Humane Wildlife Control technician in a teal uniform performing wildlife removal at a suburban home in ${suburbText}, ${cityState}, animal clearly visible, photorealistic professional photography, warm natural light, no text in image`,
      serviceLabel: "Wildlife Removal",
    };
  }
}

// ── Add brand overlay using sharp + SVG ──────────────────────────────────────
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
  const brandFontSize = Math.round(H * 0.038);
  const brandX = W - Math.round(W * 0.04) - brandFontSize * 4.5;
  const brandY = barY + Math.round(barH * 0.28);

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="${barY}" width="${W}" height="${barH}" fill="rgba(1,105,111,0.85)" rx="0"/>
    <text x="${textX}" y="${textY + fontSize}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="white">${escapeXml(serviceLabel)}</text>
    <text x="${textX}" y="${textY + fontSize + fontSizeSmall + 4}" font-family="Arial, sans-serif" font-size="${fontSizeSmall}" fill="rgba(200,235,235,0.9)">${escapeXml(cityState)}</text>
    <text x="${brandX}" y="${brandY + brandFontSize}" font-family="Arial, sans-serif" font-size="${brandFontSize}" font-weight="bold" fill="white" text-anchor="end">Skedaddle</text>
  </svg>`;

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

// ── Generate single image ────────────────────────────────────────────────────
async function generateSingleImage(
  title: string,
  body: string,
  territory: string,
  suburb: string,
): Promise<{ url: string; filename: string; serviceLabel: string }> {
  const falKey = process.env.FAL_KEY;
  if (!falKey) throw new Error("FAL_KEY not configured");

  fal.config({ credentials: falKey });

  const territoryData = TERRITORIES[territory];
  const cityState = territoryData?.cityState ?? territory;

  const { prompt, serviceLabel } = await buildPromptFromPost(title, body, territory, suburb);

  const result = await fal.run("fal-ai/flux-pro", {
    input: {
      prompt,
      image_size: "landscape_4_3",
      num_images: 1,
      num_inference_steps: 28,
      guidance_scale: 3.5,
      safety_tolerance: "2",
    },
  }) as unknown as { data: { images: Array<{ url: string }> }; requestId: string };

  const imageUrl = result.data.images[0].url;
  const resp = await fetch(imageUrl);
  const rawBuffer = Buffer.from(await resp.arrayBuffer());
  const branded = await addBrandOverlay(rawBuffer, serviceLabel, cityState);

  // Normalize to ASCII first (strips em dashes, smart quotes, accented chars, etc.)
  const asciiTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F]/g, "");
  const slug = asciiTitle.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 40);
  const filename = `${territory}_${slug}.jpg`;
  const storageKey = `gbp-images/${filename}`;
  const { url: storedUrl } = await storagePut(storageKey, branded, "image/jpeg");

  return { url: storedUrl, filename, serviceLabel };
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

  // Bulk posts → multiple images
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
      const results: Array<{
        index: number;
        url: string;
        filename: string;
        serviceLabel: string;
        success: boolean;
        error?: string;
      }> = [];

      for (let i = 0; i < input.posts.length; i++) {
        const post = input.posts[i];
        try {
          const result = await generateSingleImage(
            post.title,
            post.body,
            post.territory,
            post.suburb,
          );
          results.push({ index: i, ...result, success: true });
        } catch (err) {
          results.push({
            index: i,
            url: "",
            filename: "",
            serviceLabel: "",
            success: false,
            error: String(err),
          });
        }
      }

      return { results };
    }),
});
