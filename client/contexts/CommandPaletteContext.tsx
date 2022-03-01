import React, { SetStateAction } from "react";

interface useStatePropsType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default React.createContext<useStatePropsType>({
  setIsOpen: () => {},
  isOpen: false,
});
