import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { FieldChangedEventElementType } from "./FieldChangedEventElementType";
import { FieldChangedEventNewValueType } from "./FieldChangedEventNewValueType";
export interface FieldChangedEventPayload {
  element: FieldChangedEventElementType;
  newValue: FieldChangedEventNewValueType;
  originalEvent: Event | CustomEvent;
}
