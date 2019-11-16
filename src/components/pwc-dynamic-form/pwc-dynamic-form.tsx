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

  private constructFormElement(elem: FormJson.Element) {
    var attributes: { [k: string]: any } = { name: elem.name };

    switch (elem.type) {
      case "label":
        let labelElem = elem as FormJson.LabelElement;

        //@ts-ignore
        return <span {...attributes}>{labelElem.content}</span>;

      case "input":
        let inputElem = elem as FormJson.InputElement;
        attributes.value = inputElem.value;
        attributes.placeholder = inputElem.placeholder;

        //@ts-ignore
        return <input {...attributes}></input>;
    }

    return (
      <div>
        Name: {elem.name}, Type: {elem.type}
      </div>
    );
  }

  render() {
    return (
      <div>
        {/* FOR DEBUG BEGIN */}
        <p>Raw Form Data: {this.form}</p>
        <p>
          Parsed Form Data:
          <pre>{JSON.stringify(this.formParsed, null, 4)}</pre>
        </p>
        <slot />
        <p>Constructed:</p>
        {/* FOR DEBUG END */}
        <form>
          {this.formParsed.elements.map(elem =>
            this.constructFormElement(elem)
          )}
        </form>
      </div>
    );
  }
}
