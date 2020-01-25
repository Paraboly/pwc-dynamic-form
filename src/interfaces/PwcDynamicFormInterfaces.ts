import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { JSXBase } from "@stencil/core/dist/declarations";
import { IOption as PwcChoicesIOption } from "@paraboly/pwc-choices/dist/types/components/pwc-choices/IOption";

export namespace PwcDynamicFormInterfaces {
  export type ButtonItemConfig = JSXBase.InputHTMLAttributes<HTMLInputElement>;

  export type ContentItemConfig =
    | NativeInputConfig
    | PwcChoicesConfig
    | ColorPickerConfig;

  export type FormValueTypeUnion =
    | boolean
    | string
    | string[]
    | PwcChoicesIOption[]
    | PwcChoicesIOption;

  export type PwcChoicesType = "select-single" | "select-multi";

  export type FormChangeType = "change" | "reset";

  export type FieldChangedEventElementType =
    | HTMLInputElement
    | HTMLPwcChoicesElement
    | HTMLColorPickerElement;

  export type FieldChangedEventNewValueType = string | string[];

  export type FormValuesType = {
    [key: string]: FormValueTypeUnion;
  };

  export interface NativeInputConfig
    extends JSXBase.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }

  export interface PwcChoicesConfig
    extends JSXBase.InputHTMLAttributes<HTMLPwcChoicesElement> {
    type: PwcChoicesType;
    label: string;
  }

  export interface ColorPickerConfig
    extends JSXBase.InputHTMLAttributes<HTMLColorPickerElement> {
    label: string;
  }

  export interface FormChangedEventPayload {
    type: FormChangeType;
    fieldChangedEventPayload: FieldChangedEventPayload;
    formResetEvent: Event;
    formValues: FormValuesType;
    formElement: HTMLPwcDynamicFormElement;
  }

  export interface FieldChangedEventPayload {
    element: FieldChangedEventElementType;
    newValue: FieldChangedEventNewValueType;
    originalEvent: Event | CustomEvent;
  }
}
