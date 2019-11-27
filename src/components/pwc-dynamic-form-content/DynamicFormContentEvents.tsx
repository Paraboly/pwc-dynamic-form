export class FieldChangedEvent {
  constructor(
    element: HTMLInputElement | HTMLPwcChoicesElement,
    newValue: string | string[],
    originalEvent: Event | CustomEvent
  ) {
    this.element = element;
    this.newValue = newValue;
    this.originalEvent = originalEvent;
  }

  element: HTMLInputElement | HTMLPwcChoicesElement;
  newValue: string | string[];
  originalEvent: Event | CustomEvent;
}