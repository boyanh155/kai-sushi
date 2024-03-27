import { model, models, Schema } from "mongoose";
import { IBooking } from "./IBooking";

const booking = new Schema<IBooking>(
  {
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isNotify: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
    },
    bookDate: {
      type: Date,
      required: true,
    },
    expiredDate: {
      type: Date,
    },
    state: {
      type: String,
      enum: ["available", "expired", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

booking.pre("save", function (next) {
  if (!this.expiredDate) {
    this.expiredDate = new Date(this.bookDate.getTime() + 30 * 60 * 1000);
  }
  next();
});

const bookingModel = models.Booking || model<IBooking>("Booking", booking);

export default bookingModel;
