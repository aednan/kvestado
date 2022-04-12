import React, { RefObject } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { resetScroll } from "../services/ToolsService";

type Props = {
  scrollResetToShow: boolean;
  divRef: RefObject<HTMLDivElement> | undefined;
};

const ResetScrollButton = (props: Props) => {
  return (
    <button
      className="block disabled:hidden"
      disabled={!props.scrollResetToShow}
      onClick={() => resetScroll(props.divRef)}
    >
      <BiArrowFromBottom className="h-15 fixed bottom-24 right-0.5 z-20 min-h-[3rem] w-16 min-w-[3rem] text-sky-700 opacity-25 hover:opacity-100" />
    </button>
  );
};

export default ResetScrollButton;
