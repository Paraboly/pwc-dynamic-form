import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { PwcColorPickerConfig } from "./PwcColorPickerConfig";
import { PwcChoicesConfig } from "./PwcChoicesConfig";
import { NativeInputConfig } from "./NativeInputConfig";
export type ContentItemConfig =
  | NativeInputConfig
  | PwcChoicesConfig
  | PwcColorPickerConfig;
