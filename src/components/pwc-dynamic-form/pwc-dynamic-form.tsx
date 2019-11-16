import { Component, Prop, h, Watch } from "@stencil/core";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: false
})
export class PwcDynamicFormComponent {
  private formParsed: FormJsonObjects.Root;

  @Prop() form: string;

  @Watch("form")
  onFormChanged(form: string) {
    this.formParsed = JSON.parse(form);
    this.form = form;
  }

  componentWillLoad() {
    this.onFormChanged(this.form);
  }

  private constructFormElement(obj: FormJsonObjects.Element) {
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

declare module FormJsonObjects {
  export interface Element {
    name: string;
    type: string;
  }
  export interface Root {
    elements: Element[];
  }
}
