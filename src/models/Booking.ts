import { model, models, Schema } from "mongoose";
import { IBookingDocument } from "./IBooking";
import { EBookingState } from "../../types/Booking";
import moment from "moment";

const booking = new Schema<IBookingDocument>(
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
      enum: Object.values(EBookingState),
      default: EBookingState.PENDING,
    },
    qrcode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// booking.pre("save", function (next) {
//   // console.log(moment(this.bookDate).toDate());
//   // if (!this.expiredDate) {
//   //   this.expiredDate = new Date(
//   //     moment(this.bookDate).toDate().getTime() + 30 * 60 * 1000
//   //   );
//   // }
//   next();
// });

const bookingModel =
  models.Booking || model<IBookingDocument>("Booking", booking);

export default bookingModel;
