"use client";
import React from "react";
import SuShiBig from "./SuShiBig";
import SuShiMed from "./SuShiMed";

const SuShiIcon = () => {
  const [width, setWidth] = React.useState(640);
  React.useEffect(() => {
    if (!window) return;
    const handleResize = () => {
      setWidth(window?.innerWidth);
    };

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [window]);
  return width > 640 ? <SuShiBig /> : <SuShiMed />;
};

export default SuShiIcon;
