import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  Watch,
  Listen,
  Method
} from "@stencil/core";
import { resolveJson } from "../../utils/utils";
import { ContentItemConfig } from "./ContentItemConfig";
import { FieldChangedEventPayload } from "./FieldChangedEventPayload";
import { PwcColorPickerConfig } from "./PwcColorPickerConfig";
import { NativeInputConfig } from "./NativeInputConfig";
import { PwcChoicesConfig } from "./PwcChoicesConfig";
import { IOption } from "@paraboly/pwc-choices/dist/types/components/pwc-choices/IOption";
import _ from "lodash";

@Component({
  tag: "pwc-dynamic-form-content",
  styleUrl: "pwc-dynamic-form-content.css",
  shadow: false
})
export class PwcDynamicFormContent {
  private resolvedItems: ContentItemConfig[];
  private colorPickerRefs: HTMLPwcColorPickerElement[];
  private choicesRefs: HTMLPwcChoicesElement[];
  private nativeInputRefs: HTMLInputElement[];

  @Element() rootElement: HTMLPwcDynamicFormContentElement;

  @Prop() items: string | ContentItemConfig[];

  @Watch("items")
  itemsWatchHandler(items: string | ContentItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  @Event() fieldChanged: EventEmitter<FieldChangedEventPayload>;

  @Listen("changed")
  changedEventHandler(event: Event) {
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
  async getColorPickerRefs() {
    return this.colorPickerRefs;
  }

  @Method()
  async getChoicesRefs() {
    return this.choicesRefs;
  }

  @Method()
  async getNativeInputRefs() {
    return this.nativeInputRefs;
  }

  private constructField(field: ContentItemConfig) {
    let castedField;
    const label = field.label;
    delete field.label;

    switch (field.type) {
      case "color":
        castedField = field as PwcColorPickerConfig;
        return (
          <div class="form-group">
            <label>
              {label}
              <pwc-color-picker
                {...castedField}
                ref={this.handleColorPickerRef.bind(this, castedField)}
              ></pwc-color-picker>
            </label>
          </div>
        );

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
        return (
          <div class="form-group">
            <label>
              <input
                {...castedField}
                ref={this.handleNativeInputRef.bind(this, castedField)}
              ></input>
              {label}
            </label>
          </div>
        );

      default:
        castedField = field as NativeInputConfig;
        return (
          <div class="form-group">
            <label>
              {label}
              <input {...castedField}></input>
            </label>
          </div>
        );
    }
  }

  private handleColorPickerRef(elementConfig, ref: HTMLPwcColorPickerElement) {
    if (ref) {
      this.colorPickerRefs = _.unionBy(this.colorPickerRefs, [ref], i =>
        i.getAttribute("name")
      );
    } else {
      _.remove(
        this.colorPickerRefs,
        i => i.getAttribute("name") === elementConfig.name
      );
    }
  }

  private handleChoicesRef(elementConfig, ref: HTMLPwcChoicesElement) {
    if (ref) {
      this.choicesRefs = _.unionBy(this.choicesRefs, [ref], i => i.name);
    } else {
      _.remove(this.choicesRefs, i => i.name === elementConfig.name);
    }
  }

  private handleNativeInputRef(elementConfig, ref: HTMLInputElement) {
    if (ref) {
      this.nativeInputRefs = _.unionBy(
        this.nativeInputRefs,
        [ref],
        i => i.name
      );
    } else {
      _.remove(this.nativeInputRefs, i => i.name === elementConfig.name);
    }
  }

  private constructPwcChoices(label: string, castedField: any) {
    return (
      <div class="form-group">
        <label>
          {label}
          <pwc-choices
            {...castedField}
            ref={this.handleChoicesRef.bind(this, castedField)}
          ></pwc-choices>
        </label>
      </div>
    );
  }

  componentWillLoad() {
    this.itemsWatchHandler(this.items);
  }

  render() {
    return (
      <div>
        {this.resolvedItems
          ? this.resolvedItems.map(field => this.constructField(field))
          : ""}
      </div>
    );
  }
}
