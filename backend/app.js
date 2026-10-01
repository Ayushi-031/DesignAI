process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Wishlist from "./models/Wishlist.js";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js";
import Design from "./models/Design.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";


dotenv.config({ override: true });

// cloudinary.config({
//   cloud_name: "uveev792",
//   api_key: "134147573149788",
//   api_secret: "VHWpKRDx5nj58qrqdQAaSmEwJV0"
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const jwt_secret = process.env.JWT_SECRET || "your_jwt_secret_key"; 


app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "public/uploads/"
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },

//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({
//   storage: storage
// });

mongoose
.connect("mongodb://127.0.0.1:27017/backendproj")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });


const authtoken=(req,res,next)=>{

  const autheader = req.headers.authorization;

  if(!autheader || !autheader.startsWith("Bearer ")){
    return res.status(401).json({message:"Access denied"})
  }

  const token= autheader.split(" ")[1];
  jwt.verify(token,jwt_secret,(err,user)=>{
    if(err){
      return res.status(401).json("Access denied");
    }else{
      req.user=user;
      next();
    }
  });
}


//test route
app.get("/", (req, res) => {
  res.send("DesignAI Backend is running");
});

//signup
app.post("/api/signup", async(req,res)=>{
 try{ 
  const {username,email,password}= req.body;
  const existingUser= await User.findOne({
    username:username
  })

  if(existingUser){
    return res.status(400).json({
      message:"username already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  })
  await newUser.save();

  res.status(201).json({message:"user registered successfully"})
}
  catch(err){
    res.status(500).json({
      message:"server error", error:err.message
    })
  }

})


//login
app.post("/api/login" ,async(req,res)=>{
  try{
    const {email,password}=req.body;

    const usercheck = await User.findOne({
      email : email
    })

    if(!usercheck){
      return res.status(401)
      .json({message:"invalid username or password"})
    }

    const passwordmatch = 
    await bcrypt.compare(password, usercheck.password);

    if(!passwordmatch){
      return res.status(401).json({message:"invalid username or password"})
    }

    const token=jwt.sign({
      id: usercheck._id,
      username: usercheck.username
    }, 
    jwt_secret, 
    {
      expiresIn:"2h"
    });

    res.json({message:"login successfull", token:token})
  }
  catch(err){
     res.status(500).json({
            message: "Server error",
            error: err.message
        });
  }
})

//profile
app.get("/api/profile", authtoken, async(req,res)=>{
  try{
    const userprofile= await User.findById(req.user.id);
    if(!userprofile){
      return res.status(404).
      json({message:"user not found"})
    }

   res.json({
  username: userprofile.username,
  email: userprofile.email,
  phone: userprofile.phone,
  location: userprofile.location
});

  }catch(err){
    res.status(500)
    .json({message:"server error",error:err.message})
  }
})

//edit profile 
app.put("/api/profile", authtoken, async (req, res) => {
  try {
    const { username, phone, location } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.username = username;
    user.phone = phone;
    user.location = location;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location
      }
    });

  } catch (error) {
    console.log("Update profile error:", error);

    res.status(500).json({
      message: "Error updating profile"
    });
  }
});

//category
// app.post("/api/categories", async(req,res)=>{
//   try{
//     const {name,image}=req.body;
//     const existingCategory = await Category.findOne({
//       name:name
//     })
    
//     if(existingCategory){
//       return res.status(400).json({
//         message:"category already exists"
//       })
//     }

//     const newCategory=new Category({
//       name:name, 
//       image:image
//     })
//     await newCategory.save();

//     res.status(201).json({
//       message:"category created successfully",
//       category:newCategory
//     })

//   }catch(err){
//    res.status(500).json({
//     message:"server error", error:err.message
//    })
//   }
// })

// get all categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find({});

    res.json(categories);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

// create product
// app.post("/api/products", async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       image,
//       category,
//       stock
//     } = req.body;

//     const newProduct = new Product({
//       name: name,
//       description: description,
//       price: price,
//       image: image,
//       category: category,
//       stock: stock
//     });

//     await newProduct.save();

//     res.status(201).json({
//       message: "Product created successfully",
//       product: newProduct
//     });

//   } catch (err) {
//     res.status(500).json({
//       message: "Server error",
//       error: err.message
//     });
//   }
// });

// get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

// get product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

//wishlist get api
app.get("/api/wishlist", authtoken, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id
    }).populate("product");

    res.json(wishlist);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch wishlist"
    });
  }
});

// wishlist post req
app.post("/api/wishlist",authtoken,async(req,res)=>{
  try{
    const {productId} = req.body;

    const existingWishlist = await Wishlist.findOne({
      user: req.user.id, 
      product: productId
    })

    if(existingWishlist){
      return res.status(400).json({message:"product already in wishlist"})
    }

    const newWishlist = new Wishlist({
      user: req.user.id, 
      product:productId
    })

    await newWishlist.save();


    res.status(201).json({
      message: "Product added to wishlist",
      wishlist: newWishlist
    });

  }catch(err){
 res.status(500).json({
      message: "Failed to add product to wishlist",
      error: error.message
    });
  }
})

/// wishlist del
app.delete("/api/wishlist/:productId", authtoken, async (req, res) => {
  try {
      const deletedWishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      product: req.params.productId
    });

    if (!deletedWishlist) {
      return res.status(404).json({
        message: "Product not found in wishlist"
      });
    }

    res.json({
      message: "Product removed from wishlist"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove product from wishlist",
      error: error.message
    });
  }
});

//cart

app.get("/api/cart", authtoken, async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id
    }).populate("product");

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message
    });
  }
}); 

// cart post

app.post("/api/cart", authtoken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existingCart = await Cart.findOne({
      user: req.user.id,
      product: productId
    });

    if (existingCart) {
      existingCart.quantity += quantity || 1;
      await existingCart.save();

      return res.json({
        message: "Cart quantity updated",
        cart: existingCart
      });
    }

    const newCart = new Cart({
      user: req.user.id,
      product: productId,
      quantity: quantity || 1
    });

    await newCart.save();

    res.status(201).json({
      message: "Product added to cart",
      cart: newCart 
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message
    });
  }
});

// delete cart 

app.delete("/api/cart/:productId", authtoken, async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({
      user: req.user.id,
      product: req.params.productId
    });

    if (!deletedCart) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    res.json({
      message: "Product removed from cart"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove product from cart",
      error: error.message
    });
  }
});

////

app.put("/api/cart/:productId", authtoken, async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      user: req.user.id,
      product: req.params.productId
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({
      message: "Cart quantity updated",
      cart: cartItem
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating cart quantity"
    });
  }
});


// place order 
app.post("/api/orders", authtoken, async (req, res) => {
  try {

    const {
       shippingAddress,
       paymentMethod
          } = req.body;

    const cart = await Cart.find({
      user: req.user.id
    }).populate("product");

    if (cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    const items = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const subtotal = cart.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );

    const shipping = subtotal >= 1000 ? 0 : 99;

    const total = subtotal + shipping;

    const order = new Order({
      user: req.user.id,
      items: items,
      shippingAddress: shippingAddress,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      paymentMethod: paymentMethod || "Card"
    });

    await order.save();
    await Cart.deleteMany({
      user: req.user.id
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: order
    });

  } catch (error) {

    console.log("Order error:", error);

    res.status(500).json({
      message: "Error placing order"
    });

  }
});

// get orders
app.get("/api/orders", authtoken, async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    console.log("Get orders error:", error);

    res.status(500).json({
      message: "Error fetching orders"
    });

  }
});
// Save a design
app.post("/api/designs", authtoken, async (req, res) => {
  try {
    const {
      title,
      image,
      roomType,
      designStyle,
      furniturePref,
      lighting,
      material,
      colorPref,
      budget,
      referenceMeasurement,
      products,
      totalCost
    } = req.body;

    if (!image) {
      return res.status(400).json({
        message: "Design image is required"
      });
    }

    const design = new Design({
      user: req.user.id,
      title: title || "My AI Design",
      image,
      roomType,
      designStyle,
      furniturePref,
      lighting,
      material,
      colorPref,
      budget,
      referenceMeasurement,
      products: products || [],
      totalCost: totalCost || 0
    });

    await design.save();

    res.status(201).json({
      message: "Design saved successfully",
      design
    });

  } catch (error) {
    console.log("Save design error:", error);

    res.status(500).json({
      message: "Error saving design"
    });
  }
});

// Get user's saved designs
app.get("/api/designs", authtoken, async (req, res) => {
  try {
    const designs = await Design.find({
      user: req.user.id
    })
      .populate("products")
      .sort({ createdAt: -1 });

    res.json(designs);

  } catch (error) {
    console.log("Get designs error:", error);

    res.status(500).json({
      message: "Error fetching designs"
    });
  }
});

// Delete saved design
app.delete("/api/designs/:id", authtoken, async (req, res) => {
  try {
    const design = await Design.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!design) {
      return res.status(404).json({
        message: "Design not found"
      });
    }

    res.json({
      message: "Design deleted successfully"
    });

  } catch (error) {
    console.log("Delete design error:", error);

    res.status(500).json({
      message: "Error deleting design"
    });
  }
});


app.post("/api/upload-room", authtoken, upload.single("roomImage"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image uploaded"
        });
      }

      const result = await cloudinary.uploader.upload(
         req.file.path, 
         { folder: "designAI/rooms"});

      console.log("CLOUDINARY RESULT:", result);

      res.status(201).json({
        message: "Room image uploaded successfully",
        imageUrl: result.secure_url
      });

    } catch(error){
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.http_response);
  console.log("HEADERS:", error.http_response?.headers);

  res.status(500).json({
    message: error.message
  });

}});






app.post("/api/generate-design", authtoken, async (req, res) => {
  try {
    const {
      imageUrl,
      roomType,
      designStyle,
      furniturePref,
      lighting,
      material,
      budget,
      colorPref,
      referenceMeasurement,
      prompt
    } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        message: "Room image is required"
      });
    }

    const aiPrompt = `
Redesign the provided room photograph as a realistic interior design visualization.

IMPORTANT:
- Keep the exact room architecture.
- Keep the walls, ceiling, windows and doors.
- Keep the room layout and camera perspective.
- Do not change the room dimensions.
- Do not completely replace the room with a different room.
- The output must look like the SAME ROOM after interior redesign.
- Do not add people.

Apply the following design requirements:

Room type: ${roomType || "Not specified"}
Design style: ${designStyle || "Not specified"}
Furniture preference: ${furniturePref || "Not specified"}
Lighting: ${lighting || "Not specified"}
Materials: ${material || "Not specified"}
Budget: ${budget || "Not specified"}
Color preference: ${colorPref || "Not specified"}

${
  referenceMeasurement
    ? `Reference measurement: ${referenceMeasurement}`
    : ""
}

${
  prompt
    ? `Additional user requirements: ${prompt}`
    : ""
}

Create a photorealistic interior design result.

Preserve the original room structure while changing:
- furniture
- decor
- colors
- materials
- lighting

The final result must look like the original room redesigned,
not a completely different room.
`;

    console.log("Starting Cloudflare FLUX.2 Klein image generation...");

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      throw new Error(
        `Failed to download room image: ${imageResponse.status}`
      );
    }

    const imageBuffer = await imageResponse.arrayBuffer();

    const originalContentType =
      imageResponse.headers.get("content-type") || "image/jpeg";

    const form = new FormData();

    form.append("prompt", aiPrompt);

    form.append(
      "input_image_0",
      new Blob([imageBuffer], {
        type: originalContentType
      }),
      "room.jpg"
    );

    form.append("width", "1024");
    form.append("height", "768");

    const cloudflareResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-2-klein-4b`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
        },
        body: form
      }
    );

    console.log(
      "Cloudflare status:",
      cloudflareResponse.status
    );

    if (!cloudflareResponse.ok) {
      const errorText = await cloudflareResponse.text();

      console.log(
        "Cloudflare generation error:",
        errorText
      );

      throw new Error(
        `Cloudflare AI generation failed: ${cloudflareResponse.status}`
      );
    }
    const result = await cloudflareResponse.json();

    console.log(
      "Cloudflare response keys:",
      Object.keys(result)
    );

    if (!result.result || !result.result.image) {
      throw new Error(
        "Cloudflare did not return a generated image"
      );
    }

    const generatedImageBase64 = result.result.image;

    console.log(
      "Uploading generated image to Cloudinary..."
    );

    const cloudinaryResult =
      await cloudinary.uploader.upload(
        `data:image/png;base64,${generatedImageBase64}`,
        {
          folder: "designAI/generated"
        }
      );

    console.log(
      "Generated image uploaded to Cloudinary:"
    );

    console.log(cloudinaryResult.secure_url);

    res.json({
      message: "AI design generated successfully",

      imageUrl: cloudinaryResult.secure_url,

      imageBase64:
        `data:image/png;base64,${generatedImageBase64}`
    });

  } catch (error) {

    console.log(
      "Cloudflare generation error:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "AI generation failed"
    });
  }
});

function parseDimensions(dimensionString) {
  if (!dimensionString) {
    return null;
  }

  const match = dimensionString.match(
    /W\s*(\d+(?:\.\d+)?)cm\s*[×x]\s*D\s*(\d+(?:\.\d+)?)cm\s*[×x]\s*H\s*(\d+(?:\.\d+)?)cm/i
  );

  if (!match) {
    return null;
  }

  return {
    width: parseFloat(match[1]),
    depth: parseFloat(match[2]),
    height: parseFloat(match[3])
  };
}
app.post("/api/design-products", authtoken, async (req, res) => {
  try {
    const {
      roomType,
      designStyle,
      furniturePref,
      lighting,
      material,
      colorPref,
      budget
    } = req.body;

    let maxBudget = 5000;

    if (budget === "Under $1,000") {
      maxBudget = 1000;
    } else if (budget === "$1,000–$2,500") {
      maxBudget = 2500;
    } else if (budget === "$2,500–$5,000 (Essential Refresh)") {
      maxBudget = 5000;
    } else if (budget === "$5,000–$10,000") {
      maxBudget = 10000;
    } else if (budget === "$10,000+ (Full Transformation)") {
      maxBudget = 999999;
    }

    const roomCategories = {
      "Living Room": [
        "Sofas & Sectionals",
        "Chairs & Armchairs",
        "Tables & Desks",
        "Rugs & Textiles",
        "Lighting",
        "Decor & Accessories"
      ],

      "Bedroom": [
        "Beds & Bedroom",
        "Wardrobes",
        "Storage & Shelving",
        "Rugs & Textiles",
        "Lighting",
        "Decor & Accessories"
      ],

      "Dining Room": [
        "Dining",
        "Lighting",
        "Rugs & Textiles",
        "Decor & Accessories"
      ],

      "Home Office": [
        "Tables & Desks",
        "Chairs & Armchairs",
        "Storage & Shelving",
        "Lighting",
        "Decor & Accessories"
      ],

      "Kitchen": [
        "Tables & Desks",
        "Chairs & Armchairs",
        "Lighting",
        "Storage & Shelving"
      ],

      "Bathroom": [
        "Storage & Shelving",
        "Mirrors",
        "Lighting",
        "Decor & Accessories"
      ]
    };

    const categories = roomCategories[roomType] || [];

    if (categories.length === 0) {
      return res.status(400).json({
        message: "Invalid room type"
      });
    }

    const preferences = [
      designStyle,
      furniturePref,
      lighting,
      material,
      colorPref
    ]
      .filter(Boolean)
      .map((value) => value.toLowerCase());
    const styleKeywords = {
  "japandi minimalist": [
    "japandi",
    "japanese",
    "japan",
    "nordic",
    "scandinavian",
    "minimal",
    "minimalist",
    "oak",
    "wood",
    "rattan",
    "natural",
    "neutral",
    "simple"
  ],

  "modern": [
    "modern",
    "contemporary",
    "sleek",
    "minimal",
    "metal",
    "glass"
  ],

  "bohemian": [
    "boho",
    "bohemian",
    "rattan",
    "woven",
    "earthy",
    "textured",
    "natural"
  ],

  "industrial": [
    "industrial",
    "metal",
    "steel",
    "iron",
    "leather",
    "rustic"
  ],

  "traditional": [
    "traditional",
    "classic",
    "wood",
    "carved",
    "ornate",
    "vintage"
  ]
};
    console.log("PRODUCT MATCHING:");
    console.log("Room:", roomType);
    console.log("Style:", designStyle);
    console.log("Furniture:", furniturePref);
    console.log("Lighting:", lighting);
    console.log("Material:", material);
    console.log("Color:", colorPref);

    const products = await Product.find({
      category: { $in: categories },
      stock: { $gt: 0 },
      price: { $lte: maxBudget }
    });
const scoredProducts = products.map((product) => {

  let score = 0;

  const productText = `
    ${product.name || ""}
    ${product.category || ""}
    ${product.description || ""}
    ${product.title || ""}
    ${product.tags || ""}
    ${product.type || ""}
  `.toLowerCase();

  preferences.forEach((preference) => {

    const words = preference
      .split(/[\s,&/-]+/)
      .filter((word) => word.length > 2);

    words.forEach((word) => {

      if (productText.includes(word)) {
        score += 5;
      }

    });
  });


  const style = (designStyle || "").toLowerCase();

  const matchingStyle = Object.keys(styleKeywords).find(
    (key) => style.includes(key)
  );

  if (matchingStyle) {

    styleKeywords[matchingStyle].forEach((keyword) => {

      if (productText.includes(keyword)) {
        score += 4;
      }

    });
  }


  const majorFurnitureCategories = [
    "Sofas & Sectionals",
    "Chairs & Armchairs",
    "Tables & Desks",
    "Beds & Bedroom",
    "Dining"
  ];

  if (majorFurnitureCategories.includes(product.category)) {
    score += 3;
  }


  return {
    product,
    score
  };
});


    scoredProducts.sort((a, b) => {

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.product.price - b.product.price;
    });

const selectedProducts = [];
let total = 0;

const usedCategories = new Set();

for (const item of scoredProducts) {

  const product = item.product;

  if (usedCategories.has(product.category)) {
    continue;
  }

  if (
    total + product.price <= maxBudget &&
    selectedProducts.length < 8
  ) {
    selectedProducts.push(product);
    total += product.price;
    usedCategories.add(product.category);
  }

  if (selectedProducts.length >= 8) {
    break;
  }
}

    res.json({
      products: selectedProducts,
      total: total,
      budget: maxBudget,
      remainingBudget: maxBudget - total
    });

  } catch (error) {

    console.log("Design products error:", error);

    res.status(500).json({
      message: "Failed to select design products"
    });
  }
});
app.post("/api/estimate-room", authtoken, async (req, res) => {
  try {
    const {
      imageUrl,
      referenceMeasurement
    } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        message: "Room image is required"
      });
    }

    if (!referenceMeasurement) {
      return res.status(400).json({
        message: "Reference measurement is required"
      });
    }

    const numberMatch = referenceMeasurement.match(
      /(\d+(?:\.\d+)?)/
    );

    if (!numberMatch) {
      return res.status(400).json({
        message: "Please provide a measurement like: Door height 7 ft"
      });
    }

    const referenceValue = parseFloat(numberMatch[1]);

    // Detect unit
    const lowerText = referenceMeasurement.toLowerCase();

    let referenceInFeet = referenceValue;

    if (lowerText.includes("inch") || lowerText.includes('"')) {
      referenceInFeet = referenceValue / 12;
    }

    if (lowerText.includes("meter") || lowerText.includes(" m")) {
      referenceInFeet = referenceValue * 3.28084;
    }

    /*
      Approximate room dimensions.
      These are intentionally estimates.
    */

    const height = referenceInFeet;

    const width = Number(
      (height * 1.7).toFixed(1)
    );

    const length = Number(
      (height * 2.1).toFixed(1)
    );

    res.json({
      width,
      length,
      height: Number(height.toFixed(1)),
      unit: "ft",
      approximate: true,
      referenceMeasurement
    });

  } catch (error) {

    console.log("Room estimation error:", error);

    res.status(500).json({
      message: "Failed to estimate room dimensions"
    });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});