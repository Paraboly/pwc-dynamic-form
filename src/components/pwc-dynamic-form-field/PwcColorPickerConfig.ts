import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { JSXBase } from "@stencil/core/dist/declarations";
export interface PwcColorPickerConfig
  extends JSXBase.InputHTMLAttributes<HTMLPwcColorPickerElement> {
  label: string;
}
