import "@paraboly/pwc-choices";
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
import { PwcDynamicForm } from "../../utils/PwcDynamicForm";

@Component({
  tag: "pwc-dynamic-form-content",
  styleUrl: "pwc-dynamic-form-content.css",
  shadow: false
})
export class PwcDynamicFormContentComponent {
  private resolvedItems: PwcDynamicForm.ContentItemConfig[];

  @Element() rootElement: HTMLPwcDynamicFormContentElement;

  @Prop() items: string | PwcDynamicForm.ContentItemConfig[];

  @Watch("items")
  onItemsChanged(items: string | PwcDynamicForm.ContentItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  @Event() fieldChanged: EventEmitter<PwcDynamicForm.FieldChangedEventPayload>;

  componentWillLoad() {
    this.onItemsChanged(this.items);
  }

  private handleFieldChange(
    eventPayload: PwcDynamicForm.FieldChangedEventPayload
  ) {
    this.fieldChanged.emit(eventPayload);
  }

  private constructField(field: PwcDynamicForm.ContentItemConfig) {
    let castedField;
    let label = field.label;
    delete field.label;

    switch (field.type) {
      case "color":
        castedField = field as PwcDynamicForm.ColorPickerConfig;
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
        castedField = field as PwcDynamicForm.PwcChoicesConfig;
        castedField.type = "single";
        return this.constructPwcChoices(label, castedField);

      // Special handle reason: using pwc-choices.
      case "select-multi":
        castedField = field as PwcDynamicForm.PwcChoicesConfig;
        castedField.type = "multi";
        return this.constructPwcChoices(label, castedField);

      // Special handle reason: label needs to be placed after the input element.
      case "checkbox":
        castedField = field as PwcDynamicForm.NativeInputConfig;
        return (
          <div class="form-group">
            <label>
              <input {...castedField}></input>
              {label}
            </label>
          </div>
        );

      default:
        castedField = field as PwcDynamicForm.NativeInputConfig;
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
        const fieldChangedEventPayload: PwcDynamicForm.FieldChangedEventPayload = {
          element: cp,
          newValue: cp.activeColor,
          originalEvent: originalEvent
        };
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });

    const pwcChoicesElements = this.rootElement.querySelectorAll("pwc-choices");
    pwcChoicesElements.forEach(pce => {
      pce.addEventListener("change", async originalEvent => {
        const value = (await pce.getSelectedOptions("value")) as string[];
        const fieldChangedEventPayload: PwcDynamicForm.FieldChangedEventPayload = {
          element: pce,
          newValue: value,
          originalEvent: originalEvent
        };
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });

    // vanilla html inputs
    const vanillaInputs = getVanillaHtmlInputs(this.rootElement, true);

    vanillaInputs.forEach(vf => {
      vf.addEventListener("change", e => {
        const fieldChangedEventPayload: PwcDynamicForm.FieldChangedEventPayload = {
          element: vf,
          newValue: vf.value,
          originalEvent: e
        };
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });
  }
}
