import { Component, Prop, h, Watch } from "@stencil/core";
import { FormJson } from "../../utils/FormJson";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: false
})
export class PwcDynamicFormComponent {
  private formParsed: FormJson.Root;

  @Prop() form: string;

  @Watch("form")
  onFormChanged(form: string) {
    this.formParsed = JSON.parse(form);
    this.form = form;
  }

  componentWillLoad() {
    this.onFormChanged(this.form);
  }

  private constructFormElement(obj: FormJson.Element) {
    return (
      <div>
        Name: {obj.name}, Type: {obj.type}
      </div>
    );
  }

  render() {
    return (
      <div>
        <p>Raw Form Data: {this.form}</p>
        <p>
          Parsed Form Data:
          <pre>{JSON.stringify(this.formParsed, null, 4)}</pre>
        </p>
        <slot />
        <p>Constructed:</p>
        <form>
          {this.formParsed.elements.map(elem =>
            this.constructFormElement(elem)
          )}
        </form>
      </div>
    );
  }
}
