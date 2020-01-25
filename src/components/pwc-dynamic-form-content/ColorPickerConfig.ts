import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { JSXBase } from "@stencil/core/dist/declarations";
export interface ColorPickerConfig
  extends JSXBase.InputHTMLAttributes<HTMLColorPickerElement> {
  label: string;
}
