export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  description?: string;
  dimensions?: string;
  material?: string;
  colors?: string[];
  inStock?: boolean;
}

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

const productImages = Array.from({ length: 23 }, (_, i) => `/images/products/product-${String(i + 1).padStart(2, "0")}.png`);

const materials = ["Oak", "Walnut", "Marble", "Linen", "Velvet", "Leather", "Rattan", "Ceramic", "Brass", "Steel"];
const adjectives = ["Sculptural", "Organic", "Minimal", "Artisan", "Nordic", "Japanese", "Coastal", "Modern", "Timeless", "Bespoke", "Refined", "Curated"];
const nouns: Record<string, string[]> = {
  "Sofas & Sectionals": ["Sectional", "Sofa", "Loveseat", "Chaise"],
  "Chairs & Armchairs": ["Armchair", "Accent Chair", "Lounge Chair", "Rocking Chair"],
  "Tables & Desks": ["Coffee Table", "Side Table", "Desk", "Console Table", "Dining Table"],
  "Beds & Bedroom": ["Bed Frame", "Nightstand", "Dresser", "Bench"],
  "Storage & Shelving": ["Bookshelf", "Cabinet", "Sideboard", "Media Console"],
  "Lighting": ["Floor Lamp", "Pendant", "Table Lamp", "Sconce"],
  "Rugs & Textiles": ["Area Rug", "Throw Blanket", "Cushion Set", "Curtain Panel"],
  "Outdoor": ["Outdoor Chair", "Garden Table", "Planter", "Daybed"],
  "Decor & Accessories": ["Vase", "Bowl", "Sculpture", "Candle Holder"],
  "Mirrors": ["Wall Mirror", "Floor Mirror", "Vanity Mirror", "Round Mirror"],
  "Wardrobes": ["Wardrobe", "Armoire", "Closet System"],
  "Dining": ["Dining Chair", "Bar Stool", "Buffet", "China Cabinet"],
};

function generateProducts(): Product[] {
  const products: Product[] = [];
  let id = 1;

  for (let c = 0; c < categories.length; c++) {
    const cat = categories[c];
    const catNouns = nouns[cat] || ["Item"];
    for (let i = 0; i < 50; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const mat = materials[Math.floor(Math.random() * materials.length)];
      const noun = catNouns[Math.floor(Math.random() * catNouns.length)];
      const basePrice = Math.floor(Math.random() * 4000) + 200;
      const hasDiscount = Math.random() > 0.7;
      const rating = +(3.5 + Math.random() * 1.5).toFixed(1);

      products.push({
        id: id++,
        name: `${adj} ${mat} ${noun}`,
        price: basePrice,
        originalPrice: hasDiscount ? Math.floor(basePrice * (1 + Math.random() * 0.4)) : undefined,
        category: cat,
        rating,
        reviewCount: Math.floor(Math.random() * 200) + 5,
        badge: i < 3 ? (i === 0 ? "New" : i === 1 ? "Bestseller" : "Sale") : undefined,
        description: `A beautifully crafted ${adj.toLowerCase()} ${noun.toLowerCase()} made from premium ${mat.toLowerCase()}. Designed for modern living with timeless elegance.`,
        material: mat,
        dimensions: `W${Math.floor(Math.random() * 80 + 60)}cm × D${Math.floor(Math.random() * 50 + 40)}cm × H${Math.floor(Math.random() * 80 + 40)}cm`,
        inStock: Math.random() > 0.1,
        image: productImages[(id - 1) % productImages.length],
      });
    }
  }

  return products;
}

export const products = generateProducts();

const categoryImages: Record<string, string> = {
  "Sofas & Sectionals": "/images/categories/living-room.png",
  "Chairs & Armchairs": "/images/categories/living-room.png",
  "Tables & Desks": "/images/categories/home-office.png",
  "Beds & Bedroom": "/images/categories/bedroom.png",
  "Storage & Shelving": "/images/categories/storage.png",
  "Lighting": "/images/categories/lighting.png",
  "Rugs & Textiles": "/images/categories/rugs.png",
  "Outdoor": "/images/categories/outdoor.png",
  "Decor & Accessories": "/images/categories/decor.png",
  "Mirrors": "/images/categories/mirrors.png",
  "Wardrobes": "/images/categories/bedroom.png",
  "Dining": "/images/categories/dining-room.png",
};

export const categoryList = categories.map((cat) => ({
  name: cat,
  count: products.filter((p) => p.category === cat).length,
  image: categoryImages[cat],
}));
