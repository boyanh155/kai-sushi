import React, { Suspense } from "react";
import LoadingPage from "./loading";

type Props = {
  children: React.ReactNode;
};
const BookingLayout = ({ children }: Props) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="relative content-container items-center px-7 overflow-hidden">
        {children}
        {/* <LoadingPage /> */}
      </div>
    </Suspense>
  );
};

export default BookingLayout;
