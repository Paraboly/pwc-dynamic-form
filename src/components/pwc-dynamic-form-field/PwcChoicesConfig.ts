import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { JSXBase } from "@stencil/core/dist/declarations";
import { PwcChoicesType } from "./PwcChoicesType";
export interface PwcChoicesConfig
  extends JSXBase.InputHTMLAttributes<HTMLPwcChoicesElement> {
  type: PwcChoicesType;
  label: string;
}
