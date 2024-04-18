import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Booking" });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}
const BookingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col relative content-container items-center px-7 overflow-hidden">
      {children}
      {/* <LoadingPage /> */}
    </div>
  );
};

export default BookingLayout;
