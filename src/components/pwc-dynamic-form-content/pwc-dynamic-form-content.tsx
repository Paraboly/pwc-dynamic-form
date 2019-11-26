import { Component, h, Prop, Watch } from "@stencil/core";
import { DynamicFormContentConfig } from "./DynamicFormContentConfig";
import "@paraboly/pwc-choices";
import { resolveJson } from "../../utils/utils";

@Component({
  tag: "pwc-dynamic-form-content",
  styleUrl: "pwc-dynamic-form-content.css",
  shadow: false
})
export class PwcDynamicFormContentComponent {
  private resolvedConfig: DynamicFormContentConfig.Root;

  @Prop() config: string | DynamicFormContentConfig.Root;

  @Watch("config")
  onConfigChanged(config: string | DynamicFormContentConfig.Root) {
    this.resolvedConfig = resolveJson(config);
  }

  componentWillLoad() {
    this.onConfigChanged(this.config);
  }

  private constructField(
    field:
      | DynamicFormContentConfig.NativeField
      | DynamicFormContentConfig.PwcSelectField
  ) {
    let __field;

    switch (field.type) {
      // Special handle reason: using pwc-choices.
      case "select-single":
        __field = field as DynamicFormContentConfig.PwcSelectField;
        __field.type = "single";
        return constructSelect(__field);

      // Special handle reason: using pwc-choices.
      case "select-multiple":
        __field = field as DynamicFormContentConfig.PwcSelectField;
        __field.type = "multiple";
        return constructSelect(__field);

      // Special handle reason: using pwc-choices.
      case "select-text":
        __field = field as DynamicFormContentConfig.PwcSelectField;
        __field.type = "text";
        return constructSelect(__field);

      // Special handle reason: label needs to be placed after the input element.
      case "checkbox":
        __field = field as DynamicFormContentConfig.NativeField;
        return (
          <div class="form-group">
            <label>
              <input {...__field}></input>
              {__field.label}
            </label>
          </div>
        );

      default:
        __field = field as DynamicFormContentConfig.NativeField;
        return (
          <div class="form-group">
            <label>
              {__field.label}
              <input {...__field}></input>
            </label>
          </div>
        );
    }

    function constructSelect(field) {
      return (
        <div class="form-group">
          <label>
            {field.label}
            <pwc-choices {...field}></pwc-choices>
          </label>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.resolvedConfig.fields.map(field => this.constructField(field))}
      </div>
    );
  }
}
