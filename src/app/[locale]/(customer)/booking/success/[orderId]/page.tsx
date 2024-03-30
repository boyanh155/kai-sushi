import React from "react";

type Props = {
  params: { orderId: string };
};

const SuccessPage = ({ params: { orderId } }: Props) => {
  return <div>{orderId}123</div>;
};

export default SuccessPage;
