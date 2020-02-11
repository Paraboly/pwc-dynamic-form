import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { JSXBase } from "@stencil/core/dist/declarations";
export interface NativeInputConfig
  extends JSXBase.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
