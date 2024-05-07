"use client";

import Loading from "@/components/shared/Loading";
import { useGetMenu } from "@/hooks/api/useMenuApi";
import React from "react";

import { isEmpty } from "lodash";
import DeleteHeaderModal from "@/components/Admin/Menu/DeleteHeaderModal";
import { useRouter } from "next/navigation";

const Menu = () => {
  const menuData = useGetMenu("both");
  const [deleteId, setDeleteId] = React.useState<string>("");
  const router = useRouter();
  const navigateEdit = (id: string) => {
    router.push(`/admin/menu/${id}`);
  };
  return menuData && menuData?.isLoading ? (
    <Loading />
  ) : !isEmpty(menuData?.data) ? (
    <div className="overflow-x-auto w-full flex justify-between rounded-sm text-black bg-white">
      <table className="table flex-grow">
        <thead>
          <tr>
            <th>Order</th>

            <th>Name</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuData?.data?.map((item) => (
            <tr key={item._id}>
              <td>
                <div className="text-sm opacity-50">{item.order}</div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm opacity-50">{item.type}</div>
                  </div>
                </div>
              </td>

              <td>
                <button
                  className="btn-circle btn-sm"
                  onClick={() => navigateEdit(item._id)}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="-2.4 -2.4 28.80 28.80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#2196F3"
                    strokeWidth="0.00024000000000000003"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"
                        fill="#2196F3"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <button
                  className="btn-circle text-red-300 btn-sm"
                  onClick={() => setDeleteId(item._id)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 4.5V6H6V7.5H18V6H15V4.5H9ZM6.75 8.25H8.25V17.6893L8.56066 18H15.4393L15.75 17.6893V8.25H17.25V18.3107L16.0607 19.5H7.93934L6.75 18.3107V8.25Z"
                        fill="#ff1744"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Delete Modal */}
      <DeleteHeaderModal
        deleteId={deleteId}
        handleClose={() => {
          setDeleteId("");
          menuData?.refetch();
        }}
      />
    </div>
  ) : (
    <div>No data</div>
  );
};

export default Menu;
