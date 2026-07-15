// Skedaddle GBP Image Generator
// Generates branded GBP post images from post titles/bodies via fal.ai Flux Pro
// Three input methods: Single Post, Bulk Manual, CSV Upload

import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { Download, ImageIcon, Plus, Trash2, Upload, Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";

// ── Types ─────────────────────────────────────────────────────────────────────
interface BulkPost {
  id: string;
  title: string;
  body: string;
  territory: string;
  suburb: string;
}

interface GeneratedImage {
  url: string;
  filename: string;
  serviceLabel: string;
  title: string;
  success: boolean;
  error?: string;
}

// ── Territory Select ──────────────────────────────────────────────────────────
function TerritorySelect({
  value,
  onChange,
  territories,
}: {
  value: string;
  onChange: (v: string) => void;
  territories: Array<{ id: string; label: string }>;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 text-sm">
        <SelectValue placeholder="Select territory" />
      </SelectTrigger>
      <SelectContent>
        {territories.map((t) => (
          <SelectItem key={t.id} value={t.id}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ── Image Result Card ─────────────────────────────────────────────────────────
function ImageCard({ img }: { img: GeneratedImage }) {
  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: "oklch(0.88 0.012 80)", background: "oklch(1 0 0)" }}
    >
      {img.success ? (
        <>
          <div className="relative aspect-[4/3] bg-gray-100">
            <img src={img.url} alt={img.serviceLabel} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2">
              <Badge className="text-xs" style={{ background: "oklch(0.32 0.09 145)", color: "white" }}>
                {img.serviceLabel}
              </Badge>
            </div>
          </div>
          <div className="p-3 flex items-center justify-between gap-2">
            <p className="text-xs truncate flex-1" style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}>
              {img.title}
            </p>
            <a
              href={img.url}
              download={img.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-opacity hover:opacity-80"
              style={{ background: "oklch(0.32 0.09 145)", color: "white", fontFamily: "Inter, sans-serif" }}
            >
              <Download size={11} /> Save
            </a>
          </div>
        </>
      ) : (
        <div className="p-4 flex items-start gap-2">
          <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-600">Generation failed</p>
            <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.016 80)" }}>{img.title}</p>
            <p className="text-xs mt-1 text-red-400">{img.error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Download All as ZIP (client-side via fetch + JSZip) ───────────────────────
async function downloadAllAsZip(images: GeneratedImage[]) {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const folder = zip.folder("skedaddle-gbp-images")!;

  await Promise.all(
    images
      .filter((img) => img.success)
      .map(async (img) => {
        try {
          const resp = await fetch(img.url);
          const blob = await resp.blob();
          folder.file(img.filename, blob);
        } catch {
          // skip failed downloads
        }
      })
  );

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "skedaddle-gbp-images.zip";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function GbpImageGenerator() {
  const { data: territories = [] } = trpc.gbpImage.getTerritories.useQuery();

  // Single post state
  const [singleTitle, setSingleTitle] = useState("");
  const [singleBody, setSingleBody] = useState("");
  const [singleTerritory, setSingleTerritory] = useState("");
  const [singleSuburb, setSingleSuburb] = useState("");
  const [singleResult, setSingleResult] = useState<GeneratedImage | null>(null);

  // Bulk manual state
  const [bulkPosts, setBulkPosts] = useState<BulkPost[]>([
    { id: "1", title: "", body: "", territory: "", suburb: "" },
  ]);
  const [bulkResults, setBulkResults] = useState<GeneratedImage[]>([]);

  // CSV state
  const [csvPosts, setCsvPosts] = useState<BulkPost[]>([]);
  const [csvResults, setCsvResults] = useState<GeneratedImage[]>([]);
  const [csvFileName, setCsvFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Progress state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const generateSingle = trpc.gbpImage.generateSingle.useMutation();
  const generateBulk = trpc.gbpImage.generateBulk.useMutation();

  // ── Single Post Handler ───────────────────────────────────────────────────
  const handleSingleGenerate = async () => {
    if (!singleTitle.trim()) { toast.error("Please enter a post title"); return; }
    if (!singleTerritory) { toast.error("Please select a territory"); return; }
    setIsGenerating(true);
    setProgress({ current: 0, total: 1 });
    setSingleResult(null);
    try {
      const result = await generateSingle.mutateAsync({
        title: singleTitle,
        body: singleBody,
        territory: singleTerritory,
        suburb: singleSuburb,
      });
      setSingleResult({ ...result, title: singleTitle, success: true });
      setProgress({ current: 1, total: 1 });
      toast.success("Image generated!");
    } catch (err) {
      setSingleResult({ url: "", filename: "", serviceLabel: "", title: singleTitle, success: false, error: String(err) });
      toast.error("Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Bulk Manual Handler ───────────────────────────────────────────────────
  const handleBulkGenerate = async () => {
    const valid = bulkPosts.filter((p) => p.title.trim() && p.territory);
    if (valid.length === 0) { toast.error("Please fill in at least one post with a title and territory"); return; }
    setIsGenerating(true);
    setProgress({ current: 0, total: valid.length });
    setBulkResults([]);
    try {
      const result = await generateBulk.mutateAsync({
        posts: valid.map((p) => ({ title: p.title, body: p.body, territory: p.territory, suburb: p.suburb })),
      });
      const mapped: GeneratedImage[] = result.results.map((r, i) => ({
        url: r.url,
        filename: r.filename,
        serviceLabel: r.serviceLabel,
        title: valid[i]?.title ?? "",
        success: r.success,
        error: r.error,
      }));
      setBulkResults(mapped);
      const successCount = mapped.filter((r) => r.success).length;
      toast.success(`${successCount} of ${mapped.length} images generated`);
    } catch (err) {
      toast.error("Bulk generation failed: " + String(err));
    } finally {
      setIsGenerating(false);
    }
  };

  // ── CSV Upload Handler ────────────────────────────────────────────────────
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split("\n").filter((l) => l.trim());
      if (lines.length < 2) { toast.error("CSV must have a header row and at least one data row"); return; }
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));
      const posts: BulkPost[] = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
        const get = (key: string) => cols[headers.indexOf(key)] ?? "";
        const title = get("post_title") || get("title");
        const territory = get("territory");
        if (!title) continue;
        posts.push({
          id: String(i),
          title,
          body: get("post_body") || get("body") || "",
          territory: territory.toLowerCase().replace(/\s+/g, "-"),
          suburb: get("suburb") || "",
        });
      }
      setCsvPosts(posts);
      setCsvResults([]);
      toast.success(`Loaded ${posts.length} posts from CSV`);
    };
    reader.readAsText(file);
  };

  const handleCsvGenerate = async () => {
    if (csvPosts.length === 0) { toast.error("Please upload a CSV file first"); return; }
    const valid = csvPosts.filter((p) => p.title.trim() && p.territory);
    if (valid.length === 0) { toast.error("No valid posts found — ensure posts have a title and territory"); return; }
    setIsGenerating(true);
    setProgress({ current: 0, total: valid.length });
    setCsvResults([]);
    try {
      const result = await generateBulk.mutateAsync({
        posts: valid.map((p) => ({ title: p.title, body: p.body, territory: p.territory, suburb: p.suburb })),
      });
      const mapped: GeneratedImage[] = result.results.map((r, i) => ({
        url: r.url,
        filename: r.filename,
        serviceLabel: r.serviceLabel,
        title: valid[i]?.title ?? "",
        success: r.success,
        error: r.error,
      }));
      setCsvResults(mapped);
      const successCount = mapped.filter((r) => r.success).length;
      toast.success(`${successCount} of ${mapped.length} images generated`);
    } catch (err) {
      toast.error("Generation failed: " + String(err));
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Bulk post row helpers ─────────────────────────────────────────────────
  const addBulkRow = () => {
    setBulkPosts((prev) => [...prev, { id: Date.now().toString(), title: "", body: "", territory: "", suburb: "" }]);
  };
  const removeBulkRow = (id: string) => {
    setBulkPosts((prev) => prev.filter((p) => p.id !== id));
  };
  const updateBulkRow = (id: string, field: keyof BulkPost, value: string) => {
    setBulkPosts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const allResults = [...(singleResult ? [singleResult] : []), ...bulkResults, ...csvResults];
  const successResults = allResults.filter((r) => r.success);

  return (
    <PortalLayout>
      <div className="px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "oklch(0.42 0.09 145)", fontFamily: "Inter, sans-serif" }}>
            Tools
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}>
            GBP Image Generator
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}>
            Generate branded Skedaddle images for Google Business Profile posts. Paste your post title and body — AI builds the perfect image prompt automatically.
          </p>
          <div className="mt-3" style={{ borderTop: "2px solid oklch(0.32 0.09 145)", width: "48px" }} />
        </div>

        {/* Progress bar */}
        {isGenerating && (
          <div className="mb-6 p-4 rounded-lg border" style={{ background: "oklch(0.97 0.012 80)", borderColor: "oklch(0.88 0.012 80)" }}>
            <div className="flex items-center gap-3 mb-2">
              <Loader2 size={16} className="animate-spin" style={{ color: "oklch(0.32 0.09 145)" }} />
              <span className="text-sm font-medium" style={{ color: "oklch(0.32 0.09 145)", fontFamily: "Inter, sans-serif" }}>
                Generating images... this takes about 10–15 seconds per image
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: progress.total > 0 ? `${(progress.current / progress.total) * 100}%` : "10%",
                  background: "oklch(0.32 0.09 145)",
                }}
              />
            </div>
          </div>
        )}

        {/* Input tabs */}
        <Tabs defaultValue="single" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="single">Single Post</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Manual</TabsTrigger>
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          </TabsList>

          {/* ── Single Post ── */}
          <TabsContent value="single">
            <div className="rounded-lg border p-6" style={{ borderColor: "oklch(0.88 0.012 80)", background: "oklch(1 0 0)" }}>
              <h2 className="text-base font-bold mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}>
                Single Post
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "oklch(0.52 0.016 80)" }}>
                    Post Title *
                  </label>
                  <Input
                    placeholder="e.g. Squirrel found nesting in Waukesha attic — humane removal by Skedaddle"
                    value={singleTitle}
                    onChange={(e) => setSingleTitle(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "oklch(0.52 0.016 80)" }}>
                    Post Body (optional — more detail = better image)
                  </label>
                  <Textarea
                    placeholder="A homeowner in Waukesha called us after hearing scratching in their attic. Our team discovered a grey squirrel had chewed through the soffit..."
                    value={singleBody}
                    onChange={(e) => setSingleBody(e.target.value)}
                    className="text-sm min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "oklch(0.52 0.016 80)" }}>
                    Territory *
                  </label>
                  <TerritorySelect value={singleTerritory} onChange={setSingleTerritory} territories={territories} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "oklch(0.52 0.016 80)" }}>
                    Suburb (optional)
                  </label>
                  <Input
                    placeholder="e.g. Waukesha"
                    value={singleSuburb}
                    onChange={(e) => setSingleSuburb(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
              <Button
                onClick={handleSingleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2"
                style={{ background: "oklch(0.32 0.09 145)", color: "white" }}
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Generate Image
              </Button>

              {singleResult && (
                <div className="mt-6 max-w-sm">
                  <ImageCard img={singleResult} />
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Bulk Manual ── */}
          <TabsContent value="bulk">
            <div className="rounded-lg border p-6" style={{ borderColor: "oklch(0.88 0.012 80)", background: "oklch(1 0 0)" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}>
                  Bulk Manual ({bulkPosts.length} post{bulkPosts.length !== 1 ? "s" : ""})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addBulkRow}
                  className="flex items-center gap-1 text-xs"
                >
                  <Plus size={12} /> Add Row
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                {bulkPosts.map((post, idx) => (
                  <div key={post.id} className="grid grid-cols-12 gap-2 items-start p-3 rounded-md" style={{ background: "oklch(0.97 0.008 80)" }}>
                    <div className="col-span-1 pt-2 text-xs font-bold text-center" style={{ color: "oklch(0.65 0.010 80)" }}>
                      {idx + 1}
                    </div>
                    <div className="col-span-4">
                      <Input
                        placeholder="Post title *"
                        value={post.title}
                        onChange={(e) => updateBulkRow(post.id, "title", e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                    <div className="col-span-3">
                      <TerritorySelect
                        value={post.territory}
                        onChange={(v) => updateBulkRow(post.id, "territory", v)}
                        territories={territories}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        placeholder="Suburb"
                        value={post.suburb}
                        onChange={(e) => updateBulkRow(post.id, "suburb", e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBulkRow(post.id)}
                        disabled={bulkPosts.length === 1}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                    <div className="col-span-11 col-start-2">
                      <Textarea
                        placeholder="Post body (optional)"
                        value={post.body}
                        onChange={(e) => updateBulkRow(post.id, "body", e.target.value)}
                        className="text-xs min-h-[50px]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleBulkGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2"
                style={{ background: "oklch(0.32 0.09 145)", color: "white" }}
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Generate {bulkPosts.filter((p) => p.title && p.territory).length} Image{bulkPosts.filter((p) => p.title && p.territory).length !== 1 ? "s" : ""}
              </Button>

              {bulkResults.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold" style={{ color: "oklch(0.18 0.015 65)" }}>
                      Results — {bulkResults.filter((r) => r.success).length} of {bulkResults.length} succeeded
                    </h3>
                    {bulkResults.filter((r) => r.success).length > 1 && (
                      <Button variant="outline" size="sm" className="text-xs flex items-center gap-1" onClick={() => downloadAllAsZip(bulkResults)}>
                        <Download size={11} /> Download All ZIP
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bulkResults.map((img, i) => <ImageCard key={i} img={img} />)}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── CSV Upload ── */}
          <TabsContent value="csv">
            <div className="rounded-lg border p-6" style={{ borderColor: "oklch(0.88 0.012 80)", background: "oklch(1 0 0)" }}>
              <h2 className="text-base font-bold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}>
                CSV Upload
              </h2>
              <p className="text-xs mb-4" style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}>
                Upload a CSV with columns: <code className="bg-gray-100 px-1 rounded">post_title</code>, <code className="bg-gray-100 px-1 rounded">post_body</code> (optional), <code className="bg-gray-100 px-1 rounded">territory</code>, <code className="bg-gray-100 px-1 rounded">suburb</code> (optional)
              </p>

              {/* CSV template download */}
              <div className="mb-4 p-3 rounded-md flex items-center justify-between" style={{ background: "oklch(0.97 0.012 80)", border: "1px solid oklch(0.88 0.012 80)" }}>
                <span className="text-xs" style={{ color: "oklch(0.52 0.016 80)" }}>Need a template?</span>
                <a
                  href={`data:text/csv;charset=utf-8,post_title,post_body,territory,suburb\n"Squirrel found in attic","A homeowner called us after hearing scratching sounds...",milwaukee,Waukesha\n"Raccoon removal in Hamilton","Spring is peak season for raccoon activity...",hamilton,Ancaster`}
                  download="gbp_posts_template.csv"
                  className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: "oklch(0.32 0.09 145)" }}
                >
                  <Download size={11} /> Download Template CSV
                </a>
              </div>

              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-green-400"
                style={{ borderColor: "oklch(0.78 0.05 145)" }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={24} className="mx-auto mb-2" style={{ color: "oklch(0.52 0.016 80)" }} />
                {csvFileName ? (
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "oklch(0.32 0.09 145)" }}>{csvFileName}</p>
                    <p className="text-xs mt-1" style={{ color: "oklch(0.52 0.016 80)" }}>{csvPosts.length} posts loaded</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium" style={{ color: "oklch(0.52 0.016 80)" }}>Click to upload CSV</p>
                    <p className="text-xs mt-1" style={{ color: "oklch(0.65 0.010 80)" }}>or drag and drop</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleCsvUpload}
                />
              </div>

              {csvPosts.length > 0 && (
                <div className="mt-4">
                  <div className="rounded-md overflow-hidden border" style={{ borderColor: "oklch(0.88 0.012 80)" }}>
                    <table className="w-full text-xs">
                      <thead style={{ background: "oklch(0.97 0.008 80)" }}>
                        <tr>
                          <th className="text-left px-3 py-2 font-semibold" style={{ color: "oklch(0.52 0.016 80)" }}>#</th>
                          <th className="text-left px-3 py-2 font-semibold" style={{ color: "oklch(0.52 0.016 80)" }}>Title</th>
                          <th className="text-left px-3 py-2 font-semibold" style={{ color: "oklch(0.52 0.016 80)" }}>Territory</th>
                          <th className="text-left px-3 py-2 font-semibold" style={{ color: "oklch(0.52 0.016 80)" }}>Suburb</th>
                          <th className="text-left px-3 py-2 font-semibold" style={{ color: "oklch(0.52 0.016 80)" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csvPosts.slice(0, 10).map((post, i) => (
                          <tr key={post.id} style={{ borderTop: "1px solid oklch(0.93 0.008 80)" }}>
                            <td className="px-3 py-2" style={{ color: "oklch(0.65 0.010 80)" }}>{i + 1}</td>
                            <td className="px-3 py-2 max-w-[200px] truncate" style={{ color: "oklch(0.18 0.015 65)" }}>{post.title}</td>
                            <td className="px-3 py-2" style={{ color: "oklch(0.52 0.016 80)" }}>{post.territory}</td>
                            <td className="px-3 py-2" style={{ color: "oklch(0.52 0.016 80)" }}>{post.suburb || "—"}</td>
                            <td className="px-3 py-2">
                              {post.title && post.territory ? (
                                <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={11} /> Ready</span>
                              ) : (
                                <span className="flex items-center gap-1 text-red-400"><XCircle size={11} /> Missing fields</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {csvPosts.length > 10 && (
                      <div className="px-3 py-2 text-xs" style={{ color: "oklch(0.65 0.010 80)", borderTop: "1px solid oklch(0.93 0.008 80)" }}>
                        + {csvPosts.length - 10} more rows
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <Button
                      onClick={handleCsvGenerate}
                      disabled={isGenerating}
                      className="flex items-center gap-2"
                      style={{ background: "oklch(0.32 0.09 145)", color: "white" }}
                    >
                      {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      Generate {csvPosts.filter((p) => p.title && p.territory).length} Images
                    </Button>
                    <span className="text-xs" style={{ color: "oklch(0.65 0.010 80)" }}>
                      ~{Math.round(csvPosts.filter((p) => p.title && p.territory).length * 12 / 60)} min estimated
                    </span>
                  </div>
                </div>
              )}

              {csvResults.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold" style={{ color: "oklch(0.18 0.015 65)" }}>
                      Results — {csvResults.filter((r) => r.success).length} of {csvResults.length} succeeded
                    </h3>
                    {csvResults.filter((r) => r.success).length > 1 && (
                      <Button variant="outline" size="sm" className="text-xs flex items-center gap-1" onClick={() => downloadAllAsZip(csvResults)}>
                        <Download size={11} /> Download All ZIP
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {csvResults.map((img, i) => <ImageCard key={i} img={img} />)}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info box */}
        <div className="p-4 rounded-lg border text-sm" style={{ background: "oklch(0.97 0.012 80)", borderColor: "oklch(0.88 0.012 80)", color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}>
          <div className="flex items-start gap-2">
            <ImageIcon size={14} className="mt-0.5 shrink-0" style={{ color: "oklch(0.32 0.09 145)" }} />
            <div>
              <strong style={{ color: "oklch(0.32 0.09 145)" }}>How it works:</strong> AI reads your post title and body, extracts the species, location, and scenario, then builds a tailored Flux Pro image prompt. Each image is generated at 1024×768 with a Skedaddle brand overlay. ~10–15 seconds per image via fal.ai.
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
