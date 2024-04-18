import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EditMenuPage = ({ params: { id } }: Props) => {
  return <div>{id}</div>;
};

export default EditMenuPage;
