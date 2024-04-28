import { Link } from "@/navigation";
import React from "react";

type Props = {
  href: string;
  onClick?: (e: any) => void;
};

const CloseButton = ({ href, onClick }: Props) => {
  return (
    <Link
      href={href as any}
      onClick={onClick}
      className="bg-black cursor-pointer hover:opacity-60 px-2 py-2.5 outline outline-[1px] outline-[#878787a6] rounded-sm text-xl"
    >
      x
    </Link>
  );
};

export default CloseButton;
