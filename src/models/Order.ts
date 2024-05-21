import { model, models, Schema } from "mongoose";
import { IOrderDocument } from "./IOrder";

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counterModel = models.Counter || model("Counter", CounterSchema);
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
    amount: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      description: {
        type: String,
      },
      buyerName: {
        type: String,
      },
      buyerPhone: {
        type: String,
      },
      paymentLinkId: {
        type: String,
      },
      checkoutUrl: {
        type: String,
      },
      status: {
        type: String,
        default: "PENDING",
      },
      qrCode: {
        type: String,
      },
      expiredAt: {
        type: Number,
      },
    },

    paidInfo: {
      type: Schema.Types.Mixed,
      required: false,/* */
    },

    qrCodeImage: {
      type: String,
    },
    order: {
      type: Number,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    isPaid: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
order.pre("save", async function (next) {
  var doc = this;
  try {
    const counter = await counterModel.findByIdAndUpdate(
      { _id: "entityId" },
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true,
      }
    );

    doc.order = counter.seq;
    next();
  } catch (error: any) {
    next(error);
  }
});

// if expireAt is less than current time, set status to CANCELLED
order.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 30,
    partialFilterExpression: {
      active: false,
      isPaid: false,
      "paymentInfo.status": "CANCELLED",
    },
  }
);

const orderModel = models.Order || model<IOrderDocument>("Order", order);

export default orderModel;
