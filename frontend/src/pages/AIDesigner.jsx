import { useState } from "react";
import { Link } from "react-router";
const roomTypes = ["Living Room", "Bedroom", "Dining Room", "Home Office", "Kitchen", "Bathroom"];
const designStyles = ["Japandi Minimalist", "Scandinavian", "Mid-Century Modern", "Industrial", "Coastal", "Contemporary", "Bohemian"];
const furniturePrefs = ["Low-profile & Sculptural", "Functional & Storage", "Statement Pieces", "Organic Forms", "Modular", "Vintage"];
const lightingOptions = ["Warm Morning Sunlit", "Bright & Airy", "Moody Ambient", "Natural Daylight", "Candlelit Evening"];
const materials = ["White Oak & Limestone", "Walnut & Brass", "Marble & Steel", "Rattan & Linen", "Concrete & Wood"];
const budgets = [
  "Under ₹1,00,000",
  "₹1,00,000–₹2,50,000",
  "₹2,50,000–₹5,00,000 (Essential Refresh)",
  "₹5,00,000–₹10,00,000",
  "₹10,00,000+ (Full Transformation)"
];
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
        budget: "₹2,50,000–₹5,00,000 (Essential Refresh)",
        colorPref: "Warm Neutrals",
        prompt: "",
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productTotal, setProductTotal] = useState(0);
const [productRemainingBudget, setProductRemainingBudget] = useState(0);
    const [generated, setGenerated] = useState(false);
    const [roomDimensions, setRoomDimensions] = useState(null);
    const [referenceMeasurement, setReferenceMeasurement] = useState("");
    const [generating, setGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [roomImage, setRoomImage] = useState(null);
const [uploading, setUploading] = useState(false);
const [uploadedImage, setUploadedImage] = useState("");
    const set = (field) => (val) => setParams((p) => ({ ...p, [field]: val }));
  
    
const handleGenerate = async () => {
  if (!uploadedImage) {
    alert("Please upload a room image first");
    return;
  }

  try {
    setGenerating(true);

    const token = localStorage.getItem("token");
const productResponse = await fetch(
  "http://localhost:5000/api/design-products",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
   body: JSON.stringify({
  roomType: params.roomType,
  designStyle: params.designStyle,
  furniturePref: params.furniturePref,
  lighting: params.lighting,
  material: params.material,
  colorPref: params.colorPref,
  budget: params.budget,
  referenceMeasurement: referenceMeasurement
})
  }
);

const productData = await productResponse.json();

if (!productResponse.ok) {
  alert(productData.message || "Product selection failed");
  return;
}

console.log("SELECTED PRODUCTS:", productData);

setSelectedProducts(productData.products);
setProductTotal(productData.total);
setProductRemainingBudget(productData.remainingBudget);

    const response = await fetch(
      "http://localhost:5000/api/generate-design",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          imageUrl: uploadedImage,
          roomType: params.roomType,
          designStyle: params.designStyle,
          furniturePref: params.furniturePref,
          lighting: params.lighting,
          material: params.material,
          budget: params.budget,
          colorPref: params.colorPref,
          referenceMeasurement: referenceMeasurement,
          prompt: params.prompt
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Design generation failed");
      return;
    }

    console.log("AI DESIGN RESPONSE:", data);

    setGeneratedImages([data.imageBase64]);
    setGenerated(true);

  } catch (error) {
    console.log("Generate design error:", error);
    alert("Design generation failed");
  } finally {
    setGenerating(false);
  }
};
const handleSaveDesigns = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!generatedImages.length) {
      alert("Please generate a design first");
      return;
    }

    for (let i = 0; i < generatedImages.length; i++) {
      const response = await fetch(
        "http://localhost:5000/api/designs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title: `AI Room Design ${i + 1}`,
            image: generatedImages[i],

            roomType: params.roomType,
            designStyle: params.designStyle,
            furniturePref: params.furniturePref,
            lighting: params.lighting,
            material: params.material,
            colorPref: params.colorPref,

            budget: params.budget,
            referenceMeasurement: referenceMeasurement,

            products: selectedProducts.map(
              (product) => product._id
            ),

            totalCost: productTotal
          })
        }
      );

      const data = await response.json();

      console.log("Save design:", data);

      if (!response.ok) {
        console.log("SAVE DESIGN ERROR:", data);
        alert(data.message || "Failed to save design");
        return;
      }
    }

    alert("Design saved successfully!");

  } catch (error) {
    console.log("Save design error:", error);
    alert("Failed to save design");
  }
};

const handleRoomUpload = async (file) => {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  if (file.size > 25 * 1024 * 1024) {
    alert("Image must be smaller than 25MB");
    return;
  }

  try {
    setRoomImage(file);
    setUploading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();
    formData.append("roomImage", file);

    const response = await fetch(
      "http://localhost:5000/api/upload-room",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    const data = await response.json();

    console.log("Room upload:", data);

    if (!response.ok) {
      alert(data.message || "Upload failed");
      return;
    }

    setUploadedImage(data.imageUrl);

    alert("Room image uploaded successfully!");

  } catch (error) {
    console.log("Room upload error:", error);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};
    return (<div className="min-h-screen bg-[#F7F2EB] pt-20">
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
              <img src="/images/hero/ai-hero.png" alt="AI designed room" className="w-full h-full object-cover"/>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-[10px] px-3 py-2 flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1l1.2 2.4 2.8.4-2 2 .4 2.8L6 7.5 3.6 8.6l.4-2.8-2-2 2.8-.4L6 1z" fill="#8B9A6E"/>
                </svg>
                <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[11px]">
                  AI Generated Concept #8492
                </span>
              </div>
            </div>
            <div className="reference-measurement">
  <label>
    Known measurement (optional)
  </label>

  <input
    type="text"
    value={referenceMeasurement}
    onChange={(e) => setReferenceMeasurement(e.target.value)}
    placeholder="Example: Door height 7 ft"
  />

  <p>
    Add one known measurement visible in the photo for a better room-size estimate.
  </p>
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

            <div
  className="border-2 border-dashed border-[rgba(198,200,187,0.6)] rounded-[12px] p-10 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-[#8b9a6e] transition-colors"
>
  <input
    id="room-upload"
    type="file"
    accept="image/png,image/jpeg,image/jpg"
    className="hidden"
    onChange={(e) => handleRoomUpload(e.target.files[0])}
  />

  {uploadedImage ? (
    <>
      <img
        src={uploadedImage}
        alt="Uploaded room"
        className="w-full max-h-[220px] object-cover rounded-[10px] mb-4"
      />

      <p className="text-[#55633c] text-[13px] font-medium">
        Room image uploaded ✓
      </p>

      <label
        htmlFor="room-upload"
        className="mt-3 text-[#55633c] text-[12px] underline cursor-pointer"
      >
        Choose another image
      </label>
    </>
  ) : (
    <>
      <div className="w-12 h-12 rounded-full bg-[#8b9a6e]/10 flex items-center justify-center mb-4">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 13V4M10 4L7 7M10 4l3 3"
            stroke="#8B9A6E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2"
            stroke="#8B9A6E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="text-[#1a1c1c] text-[14px] mb-1">
        Drag & drop your room photo here, or{" "}
        <label
          htmlFor="room-upload"
          className="text-[#55633c] underline cursor-pointer"
        >
          Browse Files
        </label>
      </p>

      <p className="text-[#45483e] text-[12px]">
        Supports high-res JPG, PNG (Max 25MB)
      </p>
    </>
  )}

  {uploading && (
    <p className="mt-3 text-[12px] text-[#55633c]">
      Uploading...
    </p>
  )}
</div>

            <div className="mt-4 bg-[#f9f9f9] rounded-[10px] p-4 flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#8B9A6E" strokeWidth="1.3"/>
                <path d="M8 7v4M8 5v.5" stroke="#8B9A6E" strokeWidth="1.3" strokeLinecap="round"/>
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
        ].map(({ label, field, options }) => (<div key={field}>
                  <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[12px] tracking-[0.24px] mb-2">{label}</p>
                  <select value={params[field]} onChange={(e) => set(field)(e.target.value)} className="w-full bg-[#f9f9f9] border border-[rgba(198,200,187,0.5)] rounded-[8px] px-3 py-[10px] font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[13px] text-[#1a1c1c] outline-none focus:border-[#8b9a6e] transition-colors cursor-pointer">
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>))}
            </div>

            {/* Color Preference */}
            <div className="mt-4">
              <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[12px] tracking-[0.24px] mb-3">Room Color Preference</p>
              <div className="flex flex-wrap gap-2">
                {colorPrefs.map((c) => (<button key={c} onClick={() => set("colorPref")(c)} className={`px-3 py-2 rounded-full text-[12px] font-['Plus_Jakarta_Sans:Medium',sans-serif] transition-colors border ${params.colorPref === c ? "bg-[#8b9a6e] text-[#25310f] border-[#8b9a6e]" : "bg-[#f9f9f9] text-[#45483e] border-[rgba(198,200,187,0.5)] hover:border-[#8b9a6e]"}`}>
                    {c}
                  </button>))}
              </div>
            </div>

            {/* Prompt */}
            <div className="mt-4">
              <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[12px] tracking-[0.24px] mb-2">Additional Prompt Instructions</p>
              <textarea value={params.prompt} onChange={(e) => setParams((p) => ({ ...p, prompt: e.target.value }))} placeholder="E.g., Include a reading corner with a sculptural lounge chair, keep walls micro-cement plaster..." className="w-full bg-[#f9f9f9] border border-[rgba(198,200,187,0.5)] rounded-[10px] px-4 py-3 font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[13px] text-[#1a1c1c] placeholder-[rgba(69,72,62,0.4)] outline-none focus:border-[#8b9a6e] transition-colors resize-none min-h-[80px]"/>
            </div>

            <button onClick={handleGenerate} disabled={generating} className="mt-4 w-full bg-[#55633c] text-white font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[14px] tracking-[0.28px] py-[14px] rounded-[12px] hover:bg-[#4a5535] transition-colors flex items-center justify-center gap-3 disabled:opacity-70">
              {generating ? (<>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Generating...
                </>) : (<>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9.5 5.5 11l.5-3.5L3.5 5l3.5-.5L8 1.5z" fill="white"/>
                  </svg>
                  Generate Design
                </>)}
            </button>
          </div>
        </div>

        {/* Generated Results */}
        {/* Generated Results */}
{generated && (
  <div className="mt-10">

    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[28px] tracking-[-0.5px]">
        Generated Design
      </h2>

      <button
        onClick={handleSaveDesigns}
        className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-5 py-[12px] rounded-[10px] hover:bg-[#7d8b62] transition-colors"
      >
        Save Design
      </button>
    </div>


    {/* Image + Room Details */}
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

      {/* Generated Image */}
      <div className="rounded-[16px] overflow-hidden bg-white border border-[rgba(198,200,187,0.4)]">
        {generatedImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`AI Generated Room ${i + 1}`}
            className="w-full aspect-video object-cover"
          />
        ))}
      </div>


      {/* Room Details */}
      <div className="bg-white border border-[rgba(198,200,187,0.4)] rounded-[16px] p-6">

        <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[17px] mb-5">
          Room Details
        </h3>

        {/* Room Type */}
        <div className="py-4 border-b border-[#e8e5df]">
          <p className="text-[#777] text-[11px] uppercase tracking-[0.5px]">
            Room Type
          </p>

          <p className="text-[#1a1c1c] text-[14px] font-medium mt-1">
            {params.roomType}
          </p>
        </div>


        {/* Dimensions */}
        <div className="py-4 border-b border-[#e8e5df]">
          <p className="text-[#777] text-[11px] uppercase tracking-[0.5px]">
            Room Dimensions
          </p>

          <p className="text-[#1a1c1c] text-[14px] font-medium mt-1">
            {referenceMeasurement || "Not provided"}
          </p>
        </div>


        {/* Budget */}
        <div className="py-4 border-b border-[#e8e5df]">
          <p className="text-[#777] text-[11px] uppercase tracking-[0.5px]">
            Budget
          </p>

          <p className="text-[#1a1c1c] text-[14px] font-medium mt-1">
            {params.budget}
          </p>
        </div>


        {/* Design Style */}
        <div className="py-4">
          <p className="text-[#777] text-[11px] uppercase tracking-[0.5px]">
            Design Style
          </p>

          <p className="text-[#1a1c1c] text-[14px] font-medium mt-1">
            {params.designStyle}
          </p>
        </div>

      </div>

    </div>


    {/* Recommended Products */}
    {selectedProducts.length > 0 && (
      <div className="mt-10">

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[26px]">
              Recommended Products
            </h2>

            <p className="text-[#777] text-[12px] mt-1">
              Products selected according to your room and budget
            </p>
          </div>
        </div>

         <div className="flex flex-wrap gap-4 mb-6">

  <div className="bg-white border border-[rgba(198,200,187,0.4)] rounded-[12px] px-5 py-4">
    <p className="text-[#777] text-[11px] uppercase tracking-[0.5px]">
      Estimated Total
    </p>

    <p className="text-[#1a1c1c] text-[20px] font-semibold mt-1">
      ₹{Number(productTotal).toLocaleString("en-IN")}
    </p>
  </div>

  <div className="bg-white border border-[rgba(198,200,187,0.4)] rounded-[12px] px-5 py-4">
    <p className="text-[#777] text-[11px] uppercase tracking-[0.5px]">
      Your Budget
    </p>

    <p className="text-[#1a1c1c] text-[20px] font-semibold mt-1">
      {params.budget}
    </p>
  </div>

  <div className="bg-white border border-[rgba(198,200,187,0.4)] rounded-[12px] px-5 py-4">
    <p className="text-[#777] text-[11px] uppercase tracking-[0.5px]">
      Remaining Budget
    </p>

    <p className="text-[#55633c] text-[20px] font-semibold mt-1">
      ₹{Number(productRemainingBudget).toLocaleString("en-IN")}
    </p>
  </div>

</div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {selectedProducts.map((product) => (

            <div
              key={product._id}
              className="bg-white border border-[rgba(198,200,187,0.4)] rounded-[16px] overflow-hidden hover:shadow-md transition-shadow"
            >

              {/* Product Image */}
              <div className="aspect-square bg-[#f5f2ed] overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

              </div>


              {/* Product Information */}
              <div className="p-4">

                <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[14px] line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-[#55633c] font-semibold text-[15px] mt-2">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="block text-center mt-4 bg-[#55633c] text-white text-[12px] font-semibold py-2.5 rounded-[9px] hover:bg-[#4a5535] transition-colors"
                >
                  View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    )}

  </div>
)}
      </div>
    </div>);
}
