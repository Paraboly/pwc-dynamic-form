import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { JSXBase } from "@stencil/core/dist/declarations";

export namespace PwcDynamicForm {
  export type ButtonItemConfig = JSXBase.InputHTMLAttributes<HTMLInputElement>;

  export type ContentItemConfig =
    | NativeInputConfig
    | PwcSelectConfig
    | ColorPickerConfig;

  export interface NativeInputConfig
    extends JSXBase.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }

  export interface PwcSelectConfig
    extends JSXBase.InputHTMLAttributes<HTMLPwcChoicesElement> {
    type: "select-single" | "select-multiple" | "select-text";
    label: string;
    choices: Array<any>;
    distinct?: "value" | "label" | "all" | "none";
  }

  export interface ColorPickerConfig
    extends JSXBase.InputHTMLAttributes<HTMLColorPickerElement> {
    label: string;
  }

  export interface FormChangedEventPayload {
    type: "change" | "reset";
    fieldChangedEventPayload: FieldChangedEventPayload;
    formResetEvent: Event;
    formValues: { [key: string]: boolean | string | string[] };
    formElement: HTMLPwcDynamicFormElement;
  }

  export interface FieldChangedEventPayload {
    element: HTMLInputElement | HTMLPwcChoicesElement | HTMLColorPickerElement;
    newValue: string | string[];
    originalEvent: Event | CustomEvent;
  }
}
