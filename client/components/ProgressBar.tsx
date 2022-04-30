import React from "react";

type Props = {
  progress: number | string;
};

const ProgressBar = (props: Props) => {
  return (
    <div className="flex h-full max-h-[0.5rem] min-h-[0.5rem] w-full max-w-sm rounded-sm bg-slate-200 align-middle">
      <p
        className="max-h-[0.4rem] min-h-[0.4rem] max-w-sm self-center  rounded-sm bg-sky-700"
        style={{
          opacity: 1,
          width: `${
            props.progress || props.progress !== 0 ? props.progress : 2
          }%`,
        }}
      ></p>
    </div>
  );
};

export default ProgressBar;
