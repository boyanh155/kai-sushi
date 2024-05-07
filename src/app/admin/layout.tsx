import AdminLayout from "@/components/shared/layout/AdminLayout";


type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
