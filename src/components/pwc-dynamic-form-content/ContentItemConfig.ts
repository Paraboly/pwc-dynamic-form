import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { ColorPickerConfig } from "./ColorPickerConfig";
import { PwcChoicesConfig } from "./PwcChoicesConfig";
import { NativeInputConfig } from "./NativeInputConfig";
export type ContentItemConfig =
  | NativeInputConfig
  | PwcChoicesConfig
  | ColorPickerConfig;
