import React, { MouseEventHandler, useEffect, useState } from "react";

type Props = {
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  title: string;
  state: Object;
  validityCheck: Function;
};

// to rerender only the button and not all the component on state update
const SubmitButton = (props: Props) => {
  const [submitNotAllowed, setSubmitNotAllowed] = useState(true);
  useEffect(() => {
    setSubmitNotAllowed(props.validityCheck() ? true : false);
  }, [props]);

  return (
    <button
      onClick={props.onClick}
      disabled={submitNotAllowed}
      className={props.className}
    >
      {props.title}
    </button>
  );
};

export default SubmitButton;
