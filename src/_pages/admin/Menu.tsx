"use client";

import Loading from "@/components/shared/Loading";
import { useGetMenu } from "@/hooks/api/useMenuApi";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { isEmpty } from "lodash";
import DeleteHeaderModal from "@/components/Admin/Menu/DeleteHeaderModal";

type Props = {};

const Menu = (props: Props) => {
  const menuData = useGetMenu("both");
  const [deleteId, setDeleteId] = React.useState<string>("");
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
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => setDeleteId(item._id)}>
                  <Delete />
                </IconButton>
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
