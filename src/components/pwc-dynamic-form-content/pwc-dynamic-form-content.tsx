import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  Watch
} from "@stencil/core";
import { getVanillaHtmlInputs, resolveJson } from "../../utils/utils";
import { ContentItemConfig } from "./ContentItemConfig";
import { FieldChangedEventPayload } from "./FieldChangedEventPayload";
import { ColorPickerConfig } from "./ColorPickerConfig";
import { NativeInputConfig } from "./NativeInputConfig";
import { PwcChoicesConfig } from "./PwcChoicesConfig";
import { IOption } from "@paraboly/pwc-choices/dist/types/components/pwc-choices/IOption";

@Component({
  tag: "pwc-dynamic-form-content",
  styleUrl: "pwc-dynamic-form-content.css",
  shadow: false
})
export class PwcDynamicFormContent {
  private resolvedItems: ContentItemConfig[];

  @Element() rootElement: HTMLPwcDynamicFormContentElement;

  @Prop() items: string | ContentItemConfig[];

  @Watch("items")
  onItemsChanged(items: string | ContentItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  @Event() fieldChanged: EventEmitter<FieldChangedEventPayload>;

  componentWillLoad() {
    this.onItemsChanged(this.items);
  }

  private handleFieldChange(eventPayload: FieldChangedEventPayload) {
    this.fieldChanged.emit(eventPayload);
  }

  private constructField(field: ContentItemConfig) {
    let castedField;
    const label = field.label;
    delete field.label;

    switch (field.type) {
      case "color":
        castedField = field as ColorPickerConfig;
        return (
          <div class="form-group">
            <label>
              {label}
              <color-picker {...castedField}></color-picker>
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
              <input {...castedField}></input>
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

  private constructPwcChoices(label: string, castedField: any) {
    return (
      <div class="form-group">
        <label>
          {label}
          <pwc-choices {...castedField}></pwc-choices>
        </label>
      </div>
    );
  }

  private init() {
    const colorPickers = this.rootElement.querySelectorAll("color-picker");
    colorPickers.forEach(cp => {
      cp.addEventListener("colorPickedEvent", originalEvent => {
        const fieldChangedEventPayload: FieldChangedEventPayload = {
          element: cp,
          newValue: cp.activeColor,
          originalEvent
        };
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });

    const pwcChoicesElements = this.rootElement.querySelectorAll("pwc-choices");
    pwcChoicesElements.forEach(pce => {
      pce.addEventListener(
        "selectedOptionsChanged",
        (event: CustomEvent<IOption[]>) => {
          const fieldChangedEventPayload: FieldChangedEventPayload = {
            element: pce,
            newValue: event.detail,
            originalEvent: event
          };
          this.handleFieldChange(fieldChangedEventPayload);
        }
      );
    });

    // vanilla html inputs
    const vanillaInputs = getVanillaHtmlInputs(this.rootElement, true);

    vanillaInputs.forEach(vf => {
      vf.addEventListener("change", e => {
        const fieldChangedEventPayload: FieldChangedEventPayload = {
          element: vf,
          newValue: vf.value,
          originalEvent: e
        };
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });
  }

  componentDidLoad() {
    this.init();
  }

  componentDidUpdate() {
    this.init();
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
