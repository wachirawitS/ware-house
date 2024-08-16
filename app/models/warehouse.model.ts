import { model, models, Schema } from "mongoose";

export interface IWerehouse {
  name: string;
  status: string;
  owner: string;
}
const WerehouseSchema = new Schema<IWerehouse>(
  {
    name: String,
    status: String,
    owner: String,
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
const Werehouse = models.Werehouse || model("Werehouse", WerehouseSchema);
export default Werehouse;
