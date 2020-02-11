import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { FormChangeType } from "./FormChangeType";
import { FormValuesType } from "./FormValuesType";
import { FieldChangedEventPayload } from "../pwc-dynamic-form-field/FieldChangedEventPayload";
export interface FormChangedEventPayload {
  type: FormChangeType;
  fieldChangedEventPayload: FieldChangedEventPayload;
  formResetEvent: Event;
  formValues: FormValuesType;
  formElement: HTMLPwcDynamicFormElement;
}
