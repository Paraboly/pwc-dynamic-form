import {
  Component,
  h,
  Prop,
  Watch,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { DynamicFormContentConfig } from "./DynamicFormContentConfig";
import { FieldChangedEventPayload } from "./DynamicFormContentEvents";
import "@paraboly/pwc-choices";
import { resolveJson, getVanillaHtmlInputs } from "../../utils/utils";

@Component({
  tag: "pwc-dynamic-form-content",
  styleUrl: "pwc-dynamic-form-content.css",
  shadow: false
})
export class PwcDynamicFormContentComponent {
  private resolvedConfig: DynamicFormContentConfig.Root;

  @Element() rootElement: HTMLPwcDynamicFormContentElement;

  @Prop() config: string | DynamicFormContentConfig.Root;

  @Watch("config")
  onConfigChanged(config: string | DynamicFormContentConfig.Root) {
    this.resolvedConfig = resolveJson(config);
  }

  @Event() fieldChanged: EventEmitter<FieldChangedEventPayload>;

  componentWillLoad() {
    this.onConfigChanged(this.config);
  }

  private handleFieldChange(eventPayload: FieldChangedEventPayload) {
    this.fieldChanged.emit(eventPayload);
  }

  private constructField(
    field:
      | DynamicFormContentConfig.NativeField
      | DynamicFormContentConfig.PwcSelectField
  ) {
    let castedField;
    let label = field.label;
    delete field.label;

    switch (field.type) {
      // Special handle reason: using pwc-choices.
      case "select-single":
        castedField = field as DynamicFormContentConfig.PwcSelectField;
        castedField.type = "single";
        return constructSelect(castedField);

      // Special handle reason: using pwc-choices.
      case "select-multiple":
        castedField = field as DynamicFormContentConfig.PwcSelectField;
        castedField.type = "multiple";
        return constructSelect(castedField);

      // Special handle reason: using pwc-choices.
      case "select-text":
        castedField = field as DynamicFormContentConfig.PwcSelectField;
        castedField.type = "text";
        return constructSelect(castedField);

      // Special handle reason: label needs to be placed after the input element.
      case "checkbox":
        castedField = field as DynamicFormContentConfig.NativeField;
        return (
          <div class="form-group">
            <label>
              <input {...castedField}></input>
              {label}
            </label>
          </div>
        );

      default:
        castedField = field as DynamicFormContentConfig.NativeField;
        return (
          <div class="form-group">
            <label>
              {label}
              <input {...castedField}></input>
            </label>
          </div>
        );
    }

    function constructSelect(field) {
      return (
        <div class="form-group">
          <label>
            {label}
            <pwc-choices {...field}></pwc-choices>
          </label>
        </div>
      );
    }
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
        {this.resolvedConfig
          ? this.resolvedConfig.fields.map(field => this.constructField(field))
          : ""}
      </div>
    );
  }

  private init() {
    const pwcChoicesElements = this.rootElement.querySelectorAll("pwc-choices");
    pwcChoicesElements.forEach(pce => {
      pce.addEventListener("change", originalEvent => {
        pce.getValue().then(value => {
          const fieldChangedEventPayload = new FieldChangedEventPayload(
            pce,
            value,
            originalEvent
          );
          this.handleFieldChange(fieldChangedEventPayload);
        });
      });
    });

    // vanilla html inputs
    const vanillaInputs = getVanillaHtmlInputs(this.rootElement, true);

    vanillaInputs.forEach(vf => {
      vf.addEventListener("change", e => {
        const fieldChangedEventPayload = new FieldChangedEventPayload(
          vf,
          vf.value,
          e
        );
        this.handleFieldChange(fieldChangedEventPayload);
      });
    });
  }
}
