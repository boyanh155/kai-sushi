import AdminLayout from "@/components/shared/layout/AdminLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
