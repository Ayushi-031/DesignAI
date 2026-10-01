import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  originalPrice: {
    type: Number
  },

  image: {
    type: String
  },

  category: {
    type: String,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number
  },

  reviewCount: {
    type: Number
  },

  badge: {
    type: String
  },

  material: {
    type: String
  },

  dimensions: {
    type: String
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;