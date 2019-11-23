import { Component, h, Prop, Watch } from "@stencil/core";
import { DynamicFormContentConfig } from "./DynamicFormContentConfig";
import "@paraboly/pwc-choices";

@Component({
  tag: "pwc-dynamic-form-content",
  styleUrl: "pwc-dynamic-form-content.css",
  shadow: true
})
export class PwcDynamicFormContentComponent {
  private configParsed: DynamicFormContentConfig.Root;

  @Prop() config: string;

  @Watch("config")
  onConfigChanged(form: string) {
    this.configParsed = JSON.parse(form);
    this.config = form;
  }

  componentWillLoad() {
    this.onConfigChanged(this.config);
  }

  private constructField(field: DynamicFormContentConfig.Field) {
    switch (field.type) {
      case "text":
        const text = field as DynamicFormContentConfig.Text;

        return (
          <div class="form-group">
            <label>
              {field.label}
              <input
                type="text"
                id={field.id}
                placeholder={text.placeholder}
                value={text.value}
              />
            </label>
          </div>
        );

      case "number":
        const number = field as DynamicFormContentConfig.Number;

        return (
          <div class="form-group">
            <label>
              {field.label}
              <input
                type="number"
                id={field.id}
                placeholder={number.placeholder}
                value={number.value}
              />
            </label>
          </div>
        );

      case "checkbox":
        const checkbox = field as DynamicFormContentConfig.Checkbox;

        return (
          <div class="form-group">
            <label>
              <input type="checkbox" id={field.id} checked={checkbox.checked} />
              {field.label}
            </label>
          </div>
        );

      case "singleSelect":
        const singleSelect = field as DynamicFormContentConfig.SingleSelect;

        return (
          <div class="form-group">
            <label>
              {field.label}
              <pwc-choices
                type="single"
                id={field.id}
                name={field.id}
                choices={singleSelect.choices}
              ></pwc-choices>
            </label>
          </div>
        );

      case "multiSelect":
        const multiSelect = field as DynamicFormContentConfig.MultiSelect;

        return (
          <div class="form-group">
            <label>
              {field.label}
              <pwc-choices
                type="multiple"
                id={field.id}
                name={field.id}
                choices={multiSelect.choices}
              ></pwc-choices>
            </label>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.configParsed.fields.map(field => this.constructField(field))}
      </div>
    );
  }
}
