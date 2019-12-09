import "@paraboly/pwc-choices";

export interface FieldChangedEventPayload {
  element: HTMLInputElement | HTMLPwcChoicesElement | HTMLColorPickerElement;
  newValue: string | string[];
  originalEvent: Event | CustomEvent;
}
