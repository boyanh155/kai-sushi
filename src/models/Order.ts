import { Schema, Types } from "mongoose";
import { IOrderDocument } from "./IOrder";

const;

const order = new Schema<IOrderDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    _id: false,
  }
);


export 