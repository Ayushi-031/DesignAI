import { useState } from "react";
import { Link } from "react-router";

const roomTypes = ["Living Room", "Bedroom", "Dining Room", "Home Office", "Kitchen", "Bathroom"];
const designStyles = ["Japandi Minimalist", "Scandinavian", "Mid-Century Modern", "Industrial", "Coastal", "Contemporary", "Bohemian"];
const furniturePrefs = ["Low-profile & Sculptural", "Functional & Storage", "Statement Pieces", "Organic Forms", "Modular", "Vintage"];
const lightingOptions = ["Warm Morning Sunlit", "Bright & Airy", "Moody Ambient", "Natural Daylight", "Candlelit Evening"];
const materials = ["White Oak & Limestone", "Walnut & Brass", "Marble & Steel", "Rattan & Linen", "Concrete & Wood"];
const budgets = ["Under $1,000", "$1,000–$2,500", "$2,500–$5,000 (Essential Refresh)", "$5,000–$10,000", "$10,000+ (Full Transformation)"];
const colorPrefs = ["Warm Neutrals", "Earthy Tones", "Cool & Calm", "Monochrome", "Bold & Vibrant", "Let AI Choose"];

const mockImages = [
  "/images/hero/ai-hero.png",
  "/images/hero/home-hero.png",
  "/images/products/product-03.png",
  "/images/products/product-04.png",
];

export default function AIDesigner() {
  const [params, setParams] = useState({
    roomType: "Living Room",
    designStyle: "Japandi Minimalist",
    furniturePref: "Low-profile & Sculptural",
    lighting: "Warm Morning Sunlit",
    material: "White Oak & Limestone",
    budget: "$2,500–$5,000 (Essential Refresh)",
    colorPref: "Warm Neutrals",
    prompt: "",
  });
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const set = (field: string) => (val: string) =>
    setParams((p) => ({ ...p, [field]: val }));

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setGeneratedImages(mockImages);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      {/* Hero */}
      <div className="bg-[#EAE2D6] py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-3">
                Generative Interiors
              </p>
              <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[40px] md:text-[52px] leading-[1.1] tracking-[-1px] mb-4">
                Transform Your Room with AI
              </h1>
              <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[16px] leading-[26px] mb-6">
                Upload your room and let AI create a personalized interior design based on your preferences.
              </p>
              <div className="flex gap-3">
                <a href="#design-tool" className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-6 py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors">
                  Start Designing
                </a>
                <Link to="/saved-designs" className="border border-[rgba(198,200,187,0.8)] text-[#45483e] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[13px] px-6 py-[14px] rounded-[12px] hover:bg-[#f4f3f3] transition-colors">
                  View Gallery
                </Link>
              </div>
            </div>
            <div className="relative rounded-[16px] overflow-hidden aspect-video bg-[#EEEEEE]">
              <img
                src="/images/hero/ai-hero.png"
                alt="AI designed room"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-[10px] px-3 py-2 flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1l1.2 2.4 2.8.4-2 2 .4 2.8L6 7.5 3.6 8.6l.4-2.8-2-2 2.8-.4L6 1z" fill="#8B9A6E" />
                </svg>
                <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[11px]">
                  AI Generated Concept #8492
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design Tool */}
      <div id="design-tool" className="max-w-[1280px] mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Upload */}
          <div className="bg-white border border-[rgba(198,200,187,0.4)] rounded-[16px] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[15px]">
                1. Upload Room Source
              </h2>
              <span className="bg-[#8b9a6e]/10 text-[#55633c] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[11px] px-3 py-1 rounded-full">
                Step 1 of 2
              </span>
            </div>

            <div className="border-2 border-dashed border-[rgba(198,200,187,0.6)] rounded-[12px] p-10 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-[#8b9a6e] transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#8b9a6e]/10 flex items-center justify-center mb-4 group-hover:bg-[#8b9a6e]/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 13V4M10 4L7 7M10 4l3 3" stroke="#8B9A6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" stroke="#8B9A6E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#1a1c1c] text-[14px] mb-1">
                Drag & drop your room photo here, or{" "}
                <span className="text-[#55633c] underline cursor-pointer">Browse Files</span>
              </p>
              <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[12px]">
                Supports high-res JPG, PNG (Max 25MB)
              </p>
            </div>

            <div className="mt-4 bg-[#f9f9f9] rounded-[10px] p-4 flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#8B9A6E" strokeWidth="1.3" />
                <path d="M8 7v4M8 5v.5" stroke="#8B9A6E" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[12px] leading-[18px]">
                For best results, upload a well-lit photo capturing the full corners of your empty or currently furnished room.
              </p>
            </div>
          </div>

          {/* Right: Parameters */}
          <div className="bg-white border border-[rgba(198,200,187,0.4)] rounded-[16px] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[15px]">
                2. Design Parameters
              </h2>
              <span className="bg-[#8b9a6e]/10 text-[#55633c] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[11px] px-3 py-1 rounded-full">
                Step 2 of 2
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Room Type", field: "roomType", options: roomTypes },
                { label: "Design Style", field: "designStyle", options: designStyles },
                { label: "Furniture Preference", field: "furniturePref", options: furniturePrefs },
                { label: "Lighting Ambience", field: "lighting", options: lightingOptions },
                { label: "Key Materials", field: "material", options: materials },
                { label: "Target Budget", field: "budget", options: budgets },
              ].map(({ label, field, options }) => (
                <div key={field}>
                  <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[12px] tracking-[0.24px] mb-2">{label}</p>
                  <select
                    value={params[field as keyof typeof params]}
                    onChange={(e) => set(field)(e.target.value)}
                    className="w-full bg-[#f9f9f9] border border-[rgba(198,200,187,0.5)] rounded-[8px] px-3 py-[10px] font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[13px] text-[#1a1c1c] outline-none focus:border-[#8b9a6e] transition-colors cursor-pointer"
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* Color Preference */}
            <div className="mt-4">
              <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[12px] tracking-[0.24px] mb-3">Room Color Preference</p>
              <div className="flex flex-wrap gap-2">
                {colorPrefs.map((c) => (
                  <button
                    key={c}
                    onClick={() => set("colorPref")(c)}
                    className={`px-3 py-2 rounded-full text-[12px] font-['Plus_Jakarta_Sans:Medium',sans-serif] transition-colors border ${params.colorPref === c ? "bg-[#8b9a6e] text-[#25310f] border-[#8b9a6e]" : "bg-[#f9f9f9] text-[#45483e] border-[rgba(198,200,187,0.5)] hover:border-[#8b9a6e]"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div className="mt-4">
              <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[12px] tracking-[0.24px] mb-2">Additional Prompt Instructions</p>
              <textarea
                value={params.prompt}
                onChange={(e) => setParams((p) => ({ ...p, prompt: e.target.value }))}
                placeholder="E.g., Include a reading corner with a sculptural lounge chair, keep walls micro-cement plaster..."
                className="w-full bg-[#f9f9f9] border border-[rgba(198,200,187,0.5)] rounded-[10px] px-4 py-3 font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[13px] text-[#1a1c1c] placeholder-[rgba(69,72,62,0.4)] outline-none focus:border-[#8b9a6e] transition-colors resize-none min-h-[80px]"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="mt-4 w-full bg-[#55633c] text-white font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[14px] tracking-[0.28px] py-[14px] rounded-[12px] hover:bg-[#4a5535] transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9.5 5.5 11l.5-3.5L3.5 5l3.5-.5L8 1.5z" fill="white" />
                  </svg>
                  Generate Design
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Results */}
        {generated && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[28px] tracking-[-0.5px]">
                Generated Concepts
              </h2>
              <button className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-5 py-[12px] rounded-[10px] hover:bg-[#7d8b62] transition-colors">
                Save Designs
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedImages.map((src, i) => (
                <div key={i} className="relative rounded-[16px] overflow-hidden aspect-video group cursor-pointer">
                  <img src={src} alt={`Concept ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-[8px] px-3 py-2">
                    <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[12px]">
                      Concept #{8490 + i}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
