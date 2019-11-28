import { JSXBase } from "@stencil/core/dist/declarations";
import "@paraboly/pwc-choices";

export declare module DynamicFormContentConfig {
  export interface Root {
    fields: (NativeField | PwcSelectField)[];
  }

  export interface NativeField
    extends JSXBase.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }

  export interface PwcSelectField
    extends JSXBase.InputHTMLAttributes<HTMLPwcChoicesElement> {
    type: "select-single" | "select-multiple" | "select-text";
    label: string;
  }
}
