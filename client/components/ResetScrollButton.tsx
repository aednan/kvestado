import React, { RefObject, useContext, useEffect } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import UserSettingsContext from "../contexts/UserSettingsContext";
import { resetScroll } from "../services/ToolsService";

type Props = {
  divRef: RefObject<HTMLDivElement> | undefined;
};

const ResetScrollButton = (props: Props) => {
  const { scrollResetToShow, setScrollResetToShow } =
    useContext(UserSettingsContext);
  // scrollResetToShow === true;
  useEffect(() => {
    // console.log(props.otherProps);
    // console.log(otherProps);
    // setScrollResetToShow(scrollResetToShow ? false : true);
    // console.log(scrollResetToShow);
  }, []);
  return (
    <button
      className="block disabled:hidden"
      disabled={!scrollResetToShow}
      onClick={() => resetScroll(props.divRef)}
    >
      <BiArrowFromBottom className="h-15 fixed bottom-24 right-0.5 z-20 min-h-[3rem] w-16 min-w-[3rem] text-sky-700 opacity-25 hover:opacity-100" />
    </button>
  );
};

// ResetScrollButton.getInitialProps = (otherProps: any) => {
//   return { otherProps: { a: "-" } };
// };
export default ResetScrollButton;
