import { redirect } from "@/navigation";
import React from "react";

type Props = {};

const BookingPage = (props: Props) => {
  return redirect("/booking/order-info");
};

export default BookingPage;
