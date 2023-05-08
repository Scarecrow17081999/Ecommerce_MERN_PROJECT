import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  description: { type: String, required: [true, "Description is required"] },
  price: {
    type: Number,
    required: [true, "Price is required"],
    maxlength: [8, "Price cannot exceet 8 figures"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: { type: String, required: [true, "Category is required"] },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    maxlength: [4, "Stock cannot exceet 4 figures"],
    default: 1,
  },
  ratings: { type: Number, default: 0 },
  numOfReviews: { type: Number, default: 0 },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String },
      rating: { type: Number },
      comment: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  CreatedByuser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const ProductModel = new mongoose.model("Product", productSchema);

export default ProductModel;
