import Loading from "@/components/shared/Loading";
import useApi from "@/hooks/api/useApi";
import { Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
type Props = {
  deleteId: string;
  handleClose: () => void;
};

const DeleteHeaderModal = ({ deleteId, handleClose }: Props) => {
  const api = useApi({
    url: `menu`,
    method: "DELETE",
    key: ["menu", "delete", deleteId],
  });
  const router = useRouter();
  const confirmDelete = () => {
    api?.deleteObj?.mutateAsync(deleteId);
  };
  useEffect(() => {
    if (api.deleteObj?.isSuccess) {
      handleClose();
      return router.refresh();
      // if (api.deleteObj.status == 200) router.reload();
    }
  }, [api.deleteObj?.isSuccess]);
  return (
    <Modal open={!!deleteId} onClose={handleClose}>
      {api.deleteObj?.isPending ? (
        <Loading />
      ) : (
        <div className="w-screen flex justify-center">
          <div className=" flex flex-col gap-2 p-4 bg-white rounded-lg w-1/2 text-black">
            <div className="text-center">
              <h3 className="font-bold text-lg uppercase">Delete confirm </h3>
              <h5 className="text-base mt-2 font-semibold">
                You definitely assure about your action?
              </h5>
              <div className="flex flex-row mt-2 justify-end px-4">
                <button
                  onClick={handleClose}
                  className="btn btn-ghost uppercase"
                >
                  cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn btn-error uppercase"
                >
                  confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DeleteHeaderModal;
