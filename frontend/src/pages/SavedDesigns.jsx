import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedDesigns() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/designs",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log("Saved Designs:", data);

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        if (Array.isArray(data)) {
          setDesigns(data);
        } else {
          setDesigns([]);
        }

      } catch (error) {
        console.log("Saved designs error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] pt-24 flex items-center justify-center">
        <p className="text-[#45483e]">
          Loading saved designs...
        </p>
      </div>
    );
  }

  const deleteDesign = async (designId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/designs/${designId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    console.log("Delete design:", data);

    if (!response.ok) {
      alert(data.message || "Failed to delete design");
      return;
    }

    setDesigns((prev) =>
      prev.filter((design) => design._id !== designId)
    );

  } catch (error) {
    console.log("Delete design error:", error);
  }
};
  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-24 px-6 md:px-8 pb-12">

      <div className="max-w-[1100px] mx-auto">

        <h1 className="text-[30px] font-semibold text-[#1a1c1c]">
          Saved Designs
        </h1>

        <p className="text-[13px] text-[#45483e] mt-2 mb-8">
          Your saved AI interior designs
        </p>

        {designs.length === 0 ? (

          <div className="bg-white rounded-[16px] p-10 text-center border border-[rgba(198,200,187,0.3)]">
            <h2 className="text-[20px] font-semibold text-[#1a1c1c]">
              No saved designs yet
            </h2>

            <p className="text-[13px] text-[#45483e] mt-2">
              Create a design with AI Designer and save it here.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {designs.map((design) => (

              <div
                key={design._id}
                className="bg-white rounded-[16px] overflow-hidden border border-[rgba(198,200,187,0.3)]"
              >

                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-[220px] object-cover"
                />

                <div className="p-5">

                  <h2 className="text-[17px] font-semibold text-[#1a1c1c]">
                    {design.title}
                  </h2>

                  {design.roomType && (
                    <p className="text-[12px] text-[#45483e] mt-2">
                      Room: {design.roomType}
                    </p>
                  )}

                  {design.designStyle && (
  <p className="text-[12px] text-[#45483e] mt-1">
    Style: {design.designStyle}
  </p>
)}

                  {design.budget && (
  <p className="text-[13px] font-medium text-[#55633c] mt-2">
    Budget: {design.budget}
  </p>
)}
{design.totalCost > 0 && (
  <p className="text-[13px] font-medium text-[#55633c] mt-1">
    Products: ₹{Number(design.totalCost).toLocaleString("en-IN")}
  </p>
)}
{design.referenceMeasurement && (
  <p className="text-[12px] text-[#45483e] mt-1">
    Room Size: {design.referenceMeasurement}
  </p>
)}
{design.products && design.products.length > 0 && (
  <div className="mt-4">

    <p className="text-[12px] font-semibold text-[#1a1c1c] mb-2">
      Products Used
    </p>

    <div className="space-y-2">

      {design.products.slice(0, 4).map((product) => (
        <div
  key={product._id}
  onClick={() => navigate(`/product/${product._id}`)}
  className="flex items-center gap-3 cursor-pointer hover:bg-[#F7F2EB] rounded-[8px] p-2 -mx-2 transition"
>

          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 rounded-[8px] object-cover"
            />
          )}

          <div className="min-w-0 flex-1">

            <p className="text-[12px] font-medium text-[#1a1c1c] truncate">
              {product.name}
            </p>

            {product.price !== undefined && (
              <p className="text-[11px] text-[#777]">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>
            )}

          </div>

        </div>
      ))}

    </div>

    {design.products.length > 4 && (
      <p className="text-[11px] text-[#777] mt-2">
        +{design.products.length - 4} more products
      </p>
    )}

  </div>
)}
                  <p className="text-[11px] text-[#777] mt-3">
                    Saved on{" "}
                    {new Date(design.createdAt).toLocaleDateString("en-IN")}
                  </p>
                <button
  onClick={() => deleteDesign(design._id)}
  className="mt-4 w-full py-2.5 rounded-[10px] border border-[#D8B4A0] text-[#A05A4F] text-[13px] font-medium bg-[#FFF9F6] hover:bg-[#A05A4F] hover:text-white transition-all duration-200"
>
  Delete Design
</button>
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}