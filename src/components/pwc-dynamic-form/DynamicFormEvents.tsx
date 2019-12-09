import { FieldChangedEventPayload } from "../pwc-dynamic-form-content/DynamicFormContentEvents";

export class FormChangedEventPayload {
  constructor(
    fieldChangedEvent: FieldChangedEventPayload,
    formValues: { [key: string]: boolean | string | string[] },
    formElement: HTMLPwcDynamicFormElement
  ) {
    this.fieldChangedEvent = fieldChangedEvent;
    this.formValues = formValues;
    this.formElement = formElement;
  }

  fieldChangedEvent: FieldChangedEventPayload;
  formValues: { [key: string]: boolean | string | string[] };
  formElement: HTMLPwcDynamicFormElement;
}
