import {
  Component,
  h,
  Prop,
  Watch,
  Listen,
  Method,
  Element,
  Event,
  EventEmitter
} from "@stencil/core";
import { DynamicFormConfig } from "./DynamicFormConfig";
import { resolveJson, getVanillaHtmlInputs } from "../../utils/utils";
import { FormChangedEvent } from "./DynamicFormEvents";
import { FieldChangedEvent } from "../pwc-dynamic-form-content/DynamicFormContentEvents";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: false
})
export class PwcDynamicFormComponent {
  //@ts-ignore
  private resolvedConfig: DynamicFormConfig.Root;

  @Element() rootElement: HTMLPwcDynamicFormElement;

  @Prop() config: string | DynamicFormConfig.Root;

  @Watch("config")
  onConfigChanged(config: string | DynamicFormConfig.Root) {
    this.resolvedConfig = resolveJson(config);
  }

  @Event() formChanged: EventEmitter<FormChangedEvent>;

  @Listen("fieldChanged")
  handleFieldChanged(fieldChangedEvent: FieldChangedEvent) {
    const rootElement = this.rootElement;
    this.getFieldValues().then(v => {
      const formChangedEvent = new FormChangedEvent(
        fieldChangedEvent,
        v,
        rootElement
      );
      this.formChanged.emit(formChangedEvent);
    });
  }

  @Method()
  async getFieldValues(
    returnOnlyValuesForPwcSelects: boolean = false
  ): Promise<{ [key: string]: boolean | string | string[] }> {
    const form: HTMLFormElement = this.rootElement.querySelector("form");
    let resultObj: { [key: string]: boolean | string | string[] } = {};

    // vanilla html inputs
    const vanillaInputs = getVanillaHtmlInputs(this.rootElement);

    vanillaInputs.forEach(vf => {
      if (vf.type === "checkbox") {
        resultObj[vf.name] = vf.checked;
      } else {
        resultObj[vf.name] = vf.value;
      }
    });

    // pwc-choices
    const pwcChoicesInputs = form.querySelectorAll("pwc-choices");

    for (const key in pwcChoicesInputs) {
      if (pwcChoicesInputs.hasOwnProperty(key)) {
        const ci = pwcChoicesInputs[key];
        const value = await ci.getValue(returnOnlyValuesForPwcSelects);
        resultObj[ci.name] = value;
      }
    }

    return resultObj;
  }

  componentWillLoad() {
    this.onConfigChanged(this.config);
  }

  render() {
    return (
      <form>
        <slot />
      </form>
    );
  }
}
