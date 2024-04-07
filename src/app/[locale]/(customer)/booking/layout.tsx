import React, { Suspense } from "react";
import LoadingPage from "./loading";


const BookingLayout = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="relative content-container items-center px-7 overflow-hidden">
        {/* {children} */}
        <LoadingPage />
      </div>
    </Suspense>
  );
};

export default BookingLayout;
