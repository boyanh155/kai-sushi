import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="loading loading-bars loading-lg relative top-1/2 left-1/2"></div>
    </div>
  );
};

export default Loading;
