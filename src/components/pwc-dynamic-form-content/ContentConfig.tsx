import { JSXBase } from "@stencil/core/dist/declarations";
import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";

export type FieldTypeUnion = NativeField | PwcSelectField | ColorPickerField;

export interface NativeField
  extends JSXBase.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export interface PwcSelectField
  extends JSXBase.InputHTMLAttributes<HTMLPwcChoicesElement> {
  type: "select-single" | "select-multiple" | "select-text";
  label: string;
}

export interface ColorPickerField
  extends JSXBase.InputHTMLAttributes<HTMLColorPickerElement> {
  label: string;
}
