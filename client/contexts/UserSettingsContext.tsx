import React, { SetStateAction } from "react";

interface useStatePropsType {
  isCPaletteOpen: boolean;
  setCPaletteOpen: React.Dispatch<SetStateAction<boolean>>;
  nModeEnabled: boolean;
  setNModeEnabled: React.Dispatch<SetStateAction<boolean>>;
  setScrollResetToShow: Function;
  scrollResetToShow: boolean;
}

export default React.createContext<useStatePropsType>({
  setCPaletteOpen: () => {},
  isCPaletteOpen: false,
  setNModeEnabled: () => {},
  nModeEnabled: false,
  setScrollResetToShow: () => {},
  scrollResetToShow: false,
});
