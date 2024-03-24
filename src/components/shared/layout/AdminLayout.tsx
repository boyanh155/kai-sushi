import CreateButton from "@/components/Admin/Menu/CreateButton";
import ApiProvider from "@/libs/ApiProvider";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { Suspense } from "react";
import Loading from "../Loading";

type Props = {
  children: React.ReactNode;
};
const SideBarData = [
  {
    title: "Dashboard",
    path: "dashboard",
  },
  {
    title: "Menu",
    path: "menu",
  },
];
const AdminLayout = ({ children }: Props) => {
  return (
    <html data-theme="winter">
      <body>
        <ApiProvider>
          <div className=" flex flex-col w-full gap-2 ">
            {/* sidebar */}
            <div className="flex flex-row w-full  bg-white rounded-lg px-4 py-3">
              {SideBarData.map((v) => (
                <Link
                  key={v.path}
                  href={v.path}
                  className="text-black text-center hover:bg-blue-100 border-r hover:opacity-60 border-black px-4"
                >
                  {v.title}
                </Link>
              ))}
            </div>
            {/* content */}
            <Suspense fallback={<Loading />}>
              <div className="content-container py-10">{children}</div>
            </Suspense>
          </div>
        </ApiProvider>
        <CreateButton />
      </body>
    </html>
  );
};

export default AdminLayout;
