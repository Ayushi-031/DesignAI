import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    roomType: {
      type: String,
      default: ""
    },

    designStyle: {
      type: String,
      default: ""
    },

    furniturePref: {
      type: String,
      default: ""
    },

    lighting: {
      type: String,
      default: ""
    },

    material: {
      type: String,
      default: ""
    },

    colorPref: {
      type: String,
      default: ""
    },

    budget: {
      type: String,
      default: ""
    },

    referenceMeasurement: {
      type: String,
      default: ""
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],

    totalCost: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Design = mongoose.model("Design", designSchema);

export default Design;