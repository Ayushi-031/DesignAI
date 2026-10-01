import mongoose from "mongoose";
import Product from "./models/Product.js";

const categories = [
  "Sofas & Sectionals",
  "Chairs & Armchairs",
  "Tables & Desks",
  "Beds & Bedroom",
  "Storage & Shelving",
  "Lighting",
  "Rugs & Textiles",
  "Outdoor",
  "Decor & Accessories",
  "Mirrors",
  "Wardrobes",
  "Dining",
];

const productImages = Array.from(
  { length: 23 },
  (_, i) => `/images/products/product-${String(i + 1).padStart(2, "0")}.png`
);

const materials = [
  "Oak",
  "Walnut",
  "Marble",
  "Linen",
  "Velvet",
  "Leather",
  "Rattan",
  "Ceramic",
  "Brass",
  "Steel",
];

const adjectives = [
  "Sculptural",
  "Organic",
  "Minimal",
  "Artisan",
  "Nordic",
  "Japanese",
  "Coastal",
  "Modern",
  "Timeless",
  "Bespoke",
  "Refined",
  "Curated",
];

const nouns = {
  "Sofas & Sectionals": [
    "Sectional",
    "Sofa",
    "Loveseat",
    "Chaise",
  ],

  "Chairs & Armchairs": [
    "Armchair",
    "Accent Chair",
    "Lounge Chair",
    "Rocking Chair",
  ],

  "Tables & Desks": [
    "Coffee Table",
    "Side Table",
    "Desk",
    "Console Table",
    "Dining Table",
  ],

  "Beds & Bedroom": [
    "Bed Frame",
    "Nightstand",
    "Dresser",
    "Bench",
  ],

  "Storage & Shelving": [
    "Bookshelf",
    "Cabinet",
    "Sideboard",
    "Media Console",
  ],

  "Lighting": [
    "Floor Lamp",
    "Pendant",
    "Table Lamp",
    "Sconce",
  ],

  "Rugs & Textiles": [
    "Area Rug",
    "Throw Blanket",
    "Cushion Set",
    "Curtain Panel",
  ],

  "Outdoor": [
    "Outdoor Chair",
    "Garden Table",
    "Planter",
    "Daybed",
  ],

  "Decor & Accessories": [
    "Vase",
    "Bowl",
    "Sculpture",
    "Candle Holder",
  ],

  "Mirrors": [
    "Wall Mirror",
    "Floor Mirror",
    "Vanity Mirror",
    "Round Mirror",
  ],

  "Wardrobes": [
    "Wardrobe",
    "Armoire",
    "Closet System",
  ],

  "Dining": [
    "Dining Chair",
    "Bar Stool",
    "Buffet",
    "China Cabinet",
  ],
};

function generateProducts() {
  const products = [];

  let id = 1;

  for (let c = 0; c < categories.length; c++) {
    const category = categories[c];

    const categoryNouns = nouns[category];

    for (let i = 0; i < 50; i++) {
      const adjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];

      const material =
        materials[Math.floor(Math.random() * materials.length)];

      const noun =
        categoryNouns[
          Math.floor(Math.random() * categoryNouns.length)
        ];

      const price = Math.floor(Math.random() * 4000) + 200;

      const hasDiscount = Math.random() > 0.7;

      const rating = +(3.5 + Math.random() * 1.5).toFixed(1);

      const originalPrice = hasDiscount
        ? Math.floor(price * (1 + Math.random() * 0.4))
        : undefined;

      const badge =
        i === 0
          ? "New"
          : i === 1
          ? "Bestseller"
          : i === 2
          ? "Sale"
          : undefined;

      products.push({
        name: `${adjective} ${material} ${noun}`,

        description: `A beautifully crafted ${adjective.toLowerCase()} ${noun.toLowerCase()} made from premium ${material.toLowerCase()}. Designed for modern living with timeless elegance.`,

        price,

        originalPrice,

        image: productImages[(id - 1) % productImages.length],

        category,

        stock: Math.random() > 0.1
          ? Math.floor(Math.random() * 20) + 1
          : 0,

        rating,

        reviewCount: Math.floor(Math.random() * 200) + 5,

        badge,

        material,

        dimensions: `W${Math.floor(
          Math.random() * 80 + 60
        )}cm × D${Math.floor(
          Math.random() * 50 + 40
        )}cm × H${Math.floor(
          Math.random() * 80 + 40
        )}cm`,
      });

      id++;
    }
  }

  return products;
}

async function importProducts() {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/backendproj"
    );

    console.log("MongoDB connected");

    // Remove old products
    await Product.deleteMany({});

    console.log("Old products deleted");

    const products = generateProducts();

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

  } catch (error) {
    console.log("Import error:", error);
  }
}

importProducts();