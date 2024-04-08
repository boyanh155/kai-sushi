import React from "react";

type Props = {
  children: React.ReactNode;
};
const BookingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col relative content-container items-center px-7 overflow-hidden">
      {children}
      {/* <LoadingPage /> */}
    </div>
  );
};

export default BookingLayout;
