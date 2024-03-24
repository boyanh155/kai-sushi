'use client'
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const CreateButton = (props: Props) => {
  const router = useRouter()
  return (
    <div onClick={()=>router.push('menu/create')} className="fixed bottom-4 left-4 hover:opacity-60 transition-all bg-slate-600 w-16 h-16 rounded-full flex justify-center items-center">
      <Add />
    </div>
  );
};

export default CreateButton;
