import { FieldChangedEventPayload } from "../pwc-dynamic-form-content/DynamicFormContentEvents";

export interface FormChangedEventPayload {
  type: "change" | "reset";
  fieldChangedEventPayload: FieldChangedEventPayload;
  formResetEvent: Event;
  formValues: { [key: string]: boolean | string | string[] };
  formElement: HTMLPwcDynamicFormElement;
}
