import React, { useEffect, useState } from "react";
import { NavChild, NavChildType } from "../../../../types/NavbarType";
import { Add } from "@mui/icons-material";
import _ from "lodash";

type Props = {
  changeHandler: (value: NavChild[]) => void;
};

const AddSubMenuData = ({ changeHandler }: Props) => {
  const [children, setChildren] = useState<NavChild[]>([]);

  useEffect(() => {
    if (_.isEmpty(children)) return;

    changeHandler(children!);
  }, [children]);
  return (
    <div
      tabIndex={0}
      className="collapse collapse-open  border border-base-300 bg-base-200"
    >
      <div className="collapse-title text-lg font-medium text-center">
        Body list
      </div>
      <div className="collapse-content w-full flex flex-col items-center justify-center ">
        {/* List body menu */}
        {children.map((child, id) => (
          <div
            key={id}
            className="collapse collapse-open border border-black px-3 py-4"
          >
            <div className=" text-lg text-center">
              <label className={`input input-bordered flex items-center gap-2`}>
                Title
                <input
                  type="text"
                  className="grow"
                  value={(child as NavChild).title}
                  onChange={(e) => {
                    setChildren((prev) => {
                      return prev.map((item, index) => {
                        if (index === id) {
                          return {
                            ...item,
                            title: e.target.value,
                          };
                        }
                        return item;
                      });
                    });
                  }}
                  placeholder="Daisy"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Order
                <input
                  type="number"
                  className="grow"
                  placeholder="Daisy"
                  onChange={(e) => {
                    setChildren((prev) => {
                      return prev.map((item, index) => {
                        if (index === id) {
                          return {
                            ...item,
                            order: parseInt(e.target.value),
                          };
                        }
                        return item;
                      });
                    });
                  }}
                  min={0}
                  value={(child as NavChild).order}
                />
              </label>
            </div>
            {/* Content */}

            <div className="mt-2  w-full flex-col flex justify-center border border-black rounded-lg p-3">
              <div className="font-semibold text-center leading-8">
                Content List
              </div>
              <div className="flex flex-col gap-5">
                {(child as NavChild).children?.map((subChild, subId) => (
                  <div
                    className=" w-full flex flex-col items-center justify-center gap-0.5   "
                    key={subId}
                  >
                    <label className="input input-bordered w-full flex items-center gap-2">
                      Title
                      <input
                        type="text"
                        className="grow"
                        value={subChild.title}
                        placeholder="Daisy"
                        onChange={(e) => {
                          setChildren((prev) => {
                            const newChild = [
                              ...(child as NavChild)?.children!,
                            ];
                            newChild[subId] = {
                              ...newChild[subId],
                              title: e.target.value,
                            };
                            return prev.map((item, index) => {
                              if (index === id) {
                                return {
                                  ...item,
                                  children: newChild,
                                };
                              }
                              return item;
                            });
                          });
                        }}
                      />
                    </label>
                    <textarea
                      className="textarea input-bordered w-full"
                      value={subChild.description}
                      placeholder="Enter description"
                      onChange={(e) => {
                        setChildren((prev) => {
                          const newChild = [...(child as NavChild)?.children!];
                          newChild[subId] = {
                            ...newChild[subId],
                            description: e.target.value,
                          };
                          return prev.map((item, index) => {
                            if (index === id) {
                              return {
                                ...item,
                                children: newChild,
                              };
                            }
                            return item;
                          });
                        });
                      }}
                    ></textarea>
                    <label className="input input-bordered w-full flex items-center gap-2">
                      Price
                      <input
                        type="number"
                        className="grow"
                        value={subChild.price}
                        onChange={(e) => {
                          setChildren((prev) => {
                            const newChild = [
                              ...(child as NavChild)?.children!,
                            ];
                            newChild[subId] = {
                              ...newChild[subId],
                              price: parseInt(e.target.value),
                            };
                            return prev.map((item, index) => {
                              if (index === id) {
                                return {
                                  ...item,
                                  children: newChild,
                                };
                              }
                              return item;
                            });
                          });
                        }}
                        placeholder="Daisy"
                      />
                    </label>
                    <label className="input input-bordered w-full flex items-center gap-2">
                      Order
                      <input
                        type="number"
                        className="grow"
                        min={0}
                        value={subChild.order}
                        placeholder="Daisy"
                        onChange={(e) => {
                          setChildren((prev) => {
                            const newChild = [
                              ...(child as NavChild)?.children!,
                            ];
                            newChild[subId] = {
                              ...newChild[subId],
                              order: parseInt(e.target.value),
                            };
                            return prev.map((item, index) => {
                              if (index === id) {
                                return {
                                  ...item,
                                  children: newChild,
                                };
                              }
                              return item;
                            });
                          });
                        }}
                      />
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setChildren((prev) => {
                    const newChild = [
                      ...(child as NavChild)?.children!,
                      {
                        type: NavChildType.Content,
                        children: [],
                        title: "",
                        order: 0,
                      },
                    ];
                    return prev.map((item, index) => {
                      if (index === id) {
                        return {
                          ...item,
                          children: newChild,
                        };
                      }
                      return item;
                    });
                  });
                }}
                className=" btn w-full mt-2 uppercase btn-success"
              >
                ADD CONTENT
                <Add />
              </button>
            </div>
          </div>
        ))}
        {/* Add body */}
        <button
          className="btn w-full mt-2 uppercase btn-success"
          onClick={() => {
            setChildren((prev) => [
              ...prev,
              {
                type: NavChildType.Body,
                children: [],
                title: "",
                order: 0,
              },
            ]);
          }}
        >
          add body
          <Add />
        </button>
      </div>
    </div>
  );
};

export default AddSubMenuData;
