import { useGetMenuHeaderDetailById } from "@/hooks/api/useMenuApi";
import Loading from "../shared/Loading";
import { isEmpty } from "lodash";

type Props = {
  headerId: string;
};

const MenuChild = ({ headerId }: Props) => {
  const api = useGetMenuHeaderDetailById(headerId);
  return api?.isLoading ? (
    <Loading />
  ) : !isEmpty(api?.data) ? (
    api?.data?.children?.map((item, _id) => (
      <div key={_id} className="px-6 gap-16 flex flex-col flex-grow pb-16">
        <div className="flex flex-col text-base font-medium">
          {/* BODY */}
          <div className="flex flex-col gap-1 mb-5 mt-4 items-center">
            <p className="golden-title uppercase text-center">{item.title}</p>
            <p className=" text-xs text-[#FEFEFECC] text-center font-light">
              {item.description}
            </p>
          </div>
          {/* CONTENT */}
          <div className="">
            {item.children?.map((v, id) => (
              <div
                key={`qa__${id}`}
                className="flex-col mt-4 pt-4 px-2 pb-8  border-[0.4px] border-[#959595] rounded-sm"
              >
                <div className="flex flex-row justify-between text-white  uppercase">
                  <div className="font-light w-2/3">
                    {" "}
                    {v.title?.split("/").map((line, index, array) => (
                      <div key={`ia__${index}`}>
                        {line}
                        {index < array.length - 1 && (
                          <>
                            /<br />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="font-light">
                    {v.price?.split("/").map((line, index, array) => (
                      <div key={`ia__${index}`}>
                        {line}
                        {index < array.length - 1 && (
                          <>
                            /<br />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[#FEFEFECC] mt-2 opacity-80 text-xs w-60 font-light">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>No data </div>
  );
};

export default MenuChild;
