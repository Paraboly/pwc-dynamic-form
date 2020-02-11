import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  Listen,
  Method
} from "@stencil/core";
import { IOption } from "@paraboly/pwc-choices/dist/types/components/pwc-choices/IOption";
import _ from "lodash";
import { ContentItemConfig } from "../pwc-dynamic-form-content/ContentItemConfig";
import { FieldChangedEventPayload } from "../pwc-dynamic-form-content/FieldChangedEventPayload";
import { PwcColorPickerConfig } from "../pwc-dynamic-form-content/PwcColorPickerConfig";
import { PwcChoicesConfig } from "../pwc-dynamic-form-content/PwcChoicesConfig";
import { NativeInputConfig } from "../pwc-dynamic-form-content/NativeInputConfig";

@Component({
  tag: "pwc-dynamic-form-field",
  styleUrl: "pwc-dynamic-form-field.css",
  shadow: false
})
export class PwcDynamicFormField {
  colorPickerRef: HTMLPwcColorPickerElement;
  choicesRef: HTMLPwcChoicesElement;
  nativeInputRef: HTMLInputElement;

  @Element() rootElement: HTMLPwcDynamicFormFieldElement;

  @Prop() config: ContentItemConfig;

  @Event() fieldChanged: EventEmitter<FieldChangedEventPayload>;

  @Listen("change")
  changeEventHandler(event: Event) {
    const element = event.target as HTMLInputElement;
    this.fieldChanged.emit({
      element,
      newValue: element.value,
      originalEvent: event
    });
  }

  @Listen("selectedOptionsChanged")
  selectedOptionsChangedHandler(event: CustomEvent<IOption[]>) {
    const element = event.target as HTMLInputElement;
    const value = event.detail;
    this.fieldChanged.emit({
      element,
      newValue: value,
      originalEvent: event
    });
  }

  @Listen("colorPickedEvent")
  colorPickedeventHandler(event: CustomEvent<string>) {
    event.stopPropagation();
    event.preventDefault();
    const element = event.target as HTMLPwcColorPickerElement;
    const value = event.detail;
    this.fieldChanged.emit({
      element,
      newValue: value,
      originalEvent: event
    });
  }

  @Method()
  async getValue() {
    if (this.nativeInputRef) {
      if (this.nativeInputRef.type === "checkbox") {
        return this.nativeInputRef.checked;
      } else {
        return this.nativeInputRef.value;
      }
    }

    if (this.choicesRef) {
      return this.choicesRef.getSelectedOptionsAsValues();
    }

    if (this.colorPickerRef) {
      return this.colorPickerRef.activeColor;
    }
  }

  private handleColorPickerRef(ref: HTMLPwcColorPickerElement) {
    this.colorPickerRef = ref;
  }

  private handleChoicesRef(ref: HTMLPwcChoicesElement) {
    this.choicesRef = ref;
  }

  private handleNativeInputRef(ref: HTMLInputElement) {
    this.nativeInputRef = ref;
  }

  private constructField(field: ContentItemConfig) {
    let castedField;
    const label = field.label;
    delete field.label;

    switch (field.type) {
      case "color":
        castedField = field as PwcColorPickerConfig;
        return [
          <label htmlFor={castedField.name}>{label}</label>,
          <pwc-color-picker
            {...castedField}
            ref={this.handleColorPickerRef.bind(this)}
          ></pwc-color-picker>
        ];

      // Special handle reason: using pwc-choices.
      case "select-single":
        castedField = field as PwcChoicesConfig;
        castedField.type = "single";
        return this.constructPwcChoices(label, castedField);

      // Special handle reason: using pwc-choices.
      case "select-multi":
        castedField = field as PwcChoicesConfig;
        castedField.type = "multi";
        return this.constructPwcChoices(label, castedField);

      // Special handle reason: label needs to be placed after the input element.
      case "checkbox":
        castedField = field as NativeInputConfig;
        return [
          <input
            {...castedField}
            ref={this.handleNativeInputRef.bind(this)}
          ></input>,
          <label htmlFor={castedField.name}>{label}</label>
        ];

      default:
        castedField = field as NativeInputConfig;
        return [
          <label htmlFor={castedField.name}>{label}</label>,
          <input {...castedField}></input>
        ];
    }
  }

  private constructPwcChoices(label: string, castedField: any) {
    return [
      <label htmlFor={castedField.name}>{label}</label>,
      <pwc-choices
        {...castedField}
        ref={this.handleChoicesRef.bind(this)}
      ></pwc-choices>
    ];
  }

  render() {
    return this.constructField(this.config);
  }
}
