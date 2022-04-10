import React from "react";
import { FaCaretSquareLeft } from "react-icons/fa";

type Props = {
  setOpenContribution: Function;
};

const SliderButton = (props: Props) => {
  return (
    <div
      onClick={() => {
        props.setOpenContribution(true);
      }}
      className=" group fixed top-20 right-0 z-10 flex cursor-pointer gap-1 rounded-md rounded-r-none border-4 border-dotted bg-transparent pr-1 hover:bg-sky-100"
    >
      <FaCaretSquareLeft className="m-auto h-7 w-7 text-sky-700 opacity-70 group-hover:opacity-100 md:h-8 md:w-8 lg:h-10 lg:w-10 " />
      <span className="m-auto hidden h-fit select-none justify-center pr-2 font-roboto text-lg font-black transition-all duration-1000 group-hover:block">
        Contribute
      </span>
    </div>
  );
};

export default SliderButton;
