import "@paraboly/pwc-choices";

export interface FieldChangedEventPayload {
  element: HTMLInputElement | HTMLPwcChoicesElement;
  newValue: string | string[];
  originalEvent: Event | CustomEvent;
}
