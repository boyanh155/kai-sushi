type Props = {
  isOpen: boolean;
  bt1Text: string;
  bt2Text: string;
  bt1Click: () => void;
  bt2Click: () => void;
  title: any;
};

const Modal = ({
  title,
  bt1Click,
  bt1Text,
  bt2Click,
  bt2Text,
  isOpen,
}: Props) => {
  return (
    isOpen && (
      <div className="flex justify-center px-7 items-center content-container h-screen  bg-[rgba(0,0,0,0.75)] z-40 fixed">
        <div className=" relative bottom-[15%] w-full  flex justify-start items-center flex-col bg-black z-50 p-5 rounded-sm border-golden-1 border">
          <p className="text-base text-start w-full">{title}</p>
          <div className="flex flex-row w-full gap-5 mt-4 justify-end">
            <div
              className="hover:opacity-60 cursor-pointer p-2 flex justify-center items-center  text-center text-[rgba(255,255,255,0.8)]"
              onClick={bt2Click}
            >
              {bt2Text}
            </div>
            <div
              className="flex justify-center items-center px-5 bg-[#8C773E] hover:opacity-60 cursor-pointer  text-center rounded-sm py-2"
              onClick={bt1Click}
            >
              {bt1Text}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
