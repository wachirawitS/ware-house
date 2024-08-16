import { model, models, Schema } from "mongoose";

export interface IProduct {
  productName: string;
  productNo: string;
  qty: number;
  description: string;
}
const ProductSchema = new Schema<IProduct>(
  {
    productName: String,
    productNo: String,
    description: String,
    qty: Number,
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);
const Product = models.Product || model("Product", ProductSchema);
export default Product;
