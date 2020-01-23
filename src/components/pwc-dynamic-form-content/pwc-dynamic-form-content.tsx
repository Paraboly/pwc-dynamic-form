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
import { PwcDynamicFormInterfaces } from "../../interfaces/pwc-dynamic-form-interfaces";

@Component({
  tag: "pwc-dynamic-form-content",
  styleUrl: "pwc-dynamic-form-content.css",
  shadow: false
})
export class PwcDynamicFormContent {
  private resolvedItems: PwcDynamicFormInterfaces.ContentItemConfig[];

  @Element() rootElement: HTMLPwcDynamicFormContentElement;

  @Prop() items: string | PwcDynamicFormInterfaces.ContentItemConfig[];

  @Watch("items")
  onItemsChanged(items: string | PwcDynamicFormInterfaces.ContentItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  @Event() fieldChanged: EventEmitter<
    PwcDynamicFormInterfaces.FieldChangedEventPayload
  >;

  componentWillLoad() {
    this.onItemsChanged(this.items);
  }

  private handleFieldChange(
    eventPayload: PwcDynamicFormInterfaces.FieldChangedEventPayload
  ) {
    this.fieldChanged.emit(eventPayload);
  }

  private constructField(field: PwcDynamicFormInterfaces.ContentItemConfig) {
    let castedField;
    const label = field.label;
    delete field.label;

    switch (field.type) {
      case "color":
        castedField = field as PwcDynamicFormInterfaces.ColorPickerConfig;
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
        castedField = field as PwcDynamicFormInterfaces.PwcChoicesConfig;
        castedField.type = "single";
        return this.constructPwcChoices(label, castedField);

      // Special handle reason: using pwc-choices.
      case "select-multi":
        castedField = field as PwcDynamicFormInterfaces.PwcChoicesConfig;
        castedField.type = "multi";
        return this.constructPwcChoices(label, castedField);

      // Special handle reason: label needs to be placed after the input element.
      case "checkbox":
        castedField = field as PwcDynamicFormInterfaces.NativeInputConfig;
        return (
          <div class="form-group">
            <label>
              <input {...castedField}></input>
              {label}
            </label>
          </div>
        );

      default:
        castedField = field as PwcDynamicFormInterfaces.NativeInputConfig;
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

  async componentDidLoad() {
    await this.init();
  }

  async componentDidUpdate() {
    await this.init();
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

  private init() {
    const colorPickers = this.rootElement.querySelectorAll("color-picker");
    colorPickers.forEach(cp => {
      cp.addEventListener("colorPickedEvent", originalEvent => {
        const fieldChangedEventPayload: PwcDynamicFormInterfaces.FieldChangedEventPayload = {
          element: cp,
          newValue: cp.activeColor,
          originalEvent
        };
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });

    const pwcChoicesElements = this.rootElement.querySelectorAll("pwc-choices");
    pwcChoicesElements.forEach(pce => {
      pce.addEventListener("change", async originalEvent => {
        const value = (await pce.getSelectedOptions("value")) as string[];
        const fieldChangedEventPayload: PwcDynamicFormInterfaces.FieldChangedEventPayload = {
          element: pce,
          newValue: value,
          originalEvent
        };
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });

    // vanilla html inputs
    const vanillaInputs = getVanillaHtmlInputs(this.rootElement, true);

    vanillaInputs.forEach(vf => {
      vf.addEventListener("change", e => {
        const fieldChangedEventPayload: PwcDynamicFormInterfaces.FieldChangedEventPayload = {
          element: vf,
          newValue: vf.value,
          originalEvent: e
        };
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });
  }
}
