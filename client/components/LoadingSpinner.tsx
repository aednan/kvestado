import React from "react";
import { ImSpinner2 } from "react-icons/im";

type Props = {};

const LoadingSpinner = (props?: Props) => {
  return (
    <div className="flex h-full min-h-screen w-full  bg-gray-100">
      <ImSpinner2 className="m-auto animate-[spin_1.5s_linear_infinite] cursor-default text-9xl" />
    </div>
  );
};

export default LoadingSpinner;
