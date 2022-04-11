import React, { FocusEventHandler } from "react";

type Props = {
  title: string;
  placeholder?: string;
  disabled?: boolean;
  value: string | number | readonly string[] | undefined;
  onChangeFunction: Function;
  onFocusFunction?: FocusEventHandler<HTMLInputElement> | undefined;
};

const InputField = (props: Props) => {
  return (
    <div className=" mx-auto w-full max-w-md">
      <label className="mb-1 block pl-2 font-medium  text-gray-700">
        {props.title}
      </label>
      <input
        disabled={props.disabled}
        onFocus={props.onFocusFunction}
        value={props.value}
        onChange={(e) => props.onChangeFunction(e)}
        className="
h-14 w-full rounded-lg border  p-4 text-xl
text-gray-800 drop-shadow-sm  placeholder:font-roboto 
placeholder:text-base placeholder:text-gray-400 focus:outline-none
focus:ring-0 focus:drop-shadow-md lg:placeholder:text-lg
"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputField;
