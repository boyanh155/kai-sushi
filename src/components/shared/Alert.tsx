import { useTranslations } from "next-intl";

type AlertProps = {
  messages: string[] | string;
  isVisible: boolean;
  color: "error" | "success" | "warning";
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  [x: string]: any;
};

const Alert: React.FC<AlertProps> = ({
  messages,
  isVisible,
  setIsVisible,
  color,
  ...props
}) => {
  const closeAlert = () => {
    setIsVisible(false);
  };
  const t = useTranslations("Booking");
  console.log(messages);
  return (
    isVisible && (
      <div
        className={`flex ${
          props.className
        }  py-2 px-4 flex-row justify-between ${
          color === "error" ? "border-s-[5px] border-red-600 bg-[#FFDCDC] " : ""
        }`}
      >
        <div
          className={`flex flex-col ${color === "error" ? "text-red-600" : ""}`}
        >
          <p className="font-bold">{t("error_bellow")}</p>
          <ul className="list-disc ps-6">
            {typeof messages != "string" ? (
              messages.map((message, index) => (
                <li className="text-base font-normal text-black" key={index}>
                  {message}
                </li>
              ))
            ) : (
              <li className="text-base font-normal text-black">
                {(messages as any).message || messages}
              </li>
            )}
          </ul>
        </div>
        <div
          className="text-[#656565] cursor-pointer hover:opacity-60 transition-all font-base"
          onClick={closeAlert}
        >
          x
        </div>
      </div>
    )
  );
};

export default Alert;
