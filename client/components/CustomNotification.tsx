import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaInfo } from "react-icons/fa";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { classNames } from "../services/ToolsService";

type Props = {};
type ToastProps = {
  content: string;
  type: string;
};

export const customToast = (props: ToastProps) => {
  toast(
    (t) => (
      <div className="flex h-full w-full  space-x-5 py-3">
        <div
          className={classNames(
            props.type == "SUCCESS"
              ? "bg-green-400"
              : props.type == "ERROR"
              ? "bg-red-400"
              : "bg-sky-400",
            "mx-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full "
          )}
        >
          {props.type == "SUCCESS" ? (
            <MdOutlineCheck className="h-5 w-5 text-white" aria-hidden="true" />
          ) : props.type == "ERROR" ? (
            <MdOutlineClose className="h-5 w-5 text-white" aria-hidden="true" />
          ) : (
            <FaInfo className="h-3 w-3 text-white" aria-hidden="true" />
          )}
        </div>
        <span className="my-auto font-roboto font-bold text-white">
          {props.content}
        </span>
        <MdOutlineClose
          className="my-auto h-7 w-7 cursor-pointer text-white"
          onClick={() => toast.dismiss(t.id)}
        />
      </div>
    ),
    {
      style: {
        background: "black",
        // border: '1px solid black',
      },
      // icon: <BiSearch />,
    }
  );
};
const CustomNotification = (props: Props) => {
  return (
    <Toaster
      containerStyle={{
        top: 80,
        left: 20,
        bottom: 20,
        right: 20,
      }}
    />
  );
};

export default CustomNotification;
