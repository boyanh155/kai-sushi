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
      <div className="flex justify-center items-center w-screen h-screen  bg-[rgba(0,0,0,0.5)] z-40 fixed">
        <div className="fixed top-1/4 w-5/6 flex justify-start items-center flex-col bg-black z-50 px-8 py-8 rounded-[4px]">
          <p className="text-base">{title}</p>
          <div className="flex flex-col w-full gap-4 mt-7">
            <div
              className="p-4 hover:opacity-60 cursor-pointer tracking-widest text-center uppercase border-[0.4px] border-[rgba(255,255,255,0.8)]"
              onClick={bt1Click}
            >
              {bt1Text}
            </div>
            <div
              className="p-4 hover:opacity-60 cursor-pointer tracking-widest text-center uppercase border-[0.4px] border-[rgba(255,255,255,0.8)]"
              onClick={bt2Click}
            >
              {bt2Text}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
