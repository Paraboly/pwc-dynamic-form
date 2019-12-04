import { FieldChangedEvent } from "../pwc-dynamic-form-content/DynamicFormContentEvents";

export class FormChangedEvent {
  constructor(
    fieldChangedEvent: FieldChangedEvent,
    formValues: { [key: string]: boolean | string | string[] },
    formElement: HTMLPwcDynamicFormElement
  ) {
    this.fieldChangedEvent = fieldChangedEvent;
    this.formValues = formValues;
    this.formElement = formElement;
  }

  fieldChangedEvent: FieldChangedEvent;
  formValues: { [key: string]: boolean | string | string[] };
  formElement: HTMLPwcDynamicFormElement;
}
