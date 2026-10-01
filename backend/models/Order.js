import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      quantity: {
        type: Number,
        required: true
      },

      price: {
        type: Number,
        required: true
      }
    }
  ],

  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    postcode: String,
    country: String
  },

  subtotal: {
    type: Number,
    required: true
  },

  shipping: {
    type: Number,
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    default: "Card"
  },

  status: {
    type: String,
    default: "Pending"
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;