import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { JSXBase } from "@stencil/core/dist/declarations";
import { PwcChoices } from "@paraboly/pwc-choices/dist/types/interfaces/PwcChoices";

export namespace PwcDynamicForm {
  export type ButtonItemConfig = JSXBase.InputHTMLAttributes<HTMLInputElement>;

  export type ContentItemConfig =
    | NativeInputConfig
    | PwcChoicesConfig
    | ColorPickerConfig;

  export interface NativeInputConfig
    extends JSXBase.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }

  export interface PwcChoicesConfig
    extends JSXBase.InputHTMLAttributes<HTMLPwcChoicesElement> {
    type: "select-single" | "select-multi";
    label: string;
  }

  export interface ColorPickerConfig
    extends JSXBase.InputHTMLAttributes<HTMLColorPickerElement> {
    label: string;
  }

  export type FormValueTypeUnion =
    | boolean
    | string
    | string[]
    | PwcChoices.IOption[]
    | PwcChoices.IOption;

  export interface FormChangedEventPayload {
    type: "change" | "reset";
    fieldChangedEventPayload: FieldChangedEventPayload;
    formResetEvent: Event;
    formValues: {
      [key: string]: FormValueTypeUnion;
    };
    formElement: HTMLPwcDynamicFormElement;
  }

  export interface FieldChangedEventPayload {
    element: HTMLInputElement | HTMLPwcChoicesElement | HTMLColorPickerElement;
    newValue: string | string[];
    originalEvent: Event | CustomEvent;
  }
}
