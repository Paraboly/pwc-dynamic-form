import {
  Component,
  h,
  Prop,
  Watch,
  Listen,
  Method,
  Element
} from "@stencil/core";
import { DynamicFormConfig } from "./DynamicFormConfig";
import { resolveJson } from "../../utils/utils";
import Enumerable from "linq";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: false
})
export class PwcDynamicFormComponent {
  private resolvedConfig: DynamicFormConfig.Root;

  @Element() rootElement: HTMLPwcDynamicFormElement;

  @Prop() config: string | DynamicFormConfig.Root;

  @Watch("config")
  onConfigChanged(config: string | DynamicFormConfig.Root) {
    this.resolvedConfig = resolveJson(config);
  }

  @Listen("submit")
  handleSubmit(event: any) {
    console.log("handleSubmitButtonClicked", event);
  }

  @Method()
  async getFieldValues(
    returnOnlyValuesForPwcSelects: boolean = false
  ): Promise<{ [key: string]: string | string[] }> {
    const form: HTMLFormElement = this.rootElement.querySelector("form");
    let resultObj: { [key: string]: string | string[] } = {};

    // vanilla html inputs
    const allInputs = form.querySelectorAll("input");
    const vanillaInputs = Enumerable.from(allInputs).where(
      a =>
        false === Enumerable.from(a.classList).any(c => c.includes("choices__"))
    );

    vanillaInputs.forEach(vf => {
      console.log(vf);
      resultObj[vf.name] = vf.value;
    });

    // pwc-choices
    const pwcChoicesInputs = form.querySelectorAll("pwc-choices");

    for (const key in pwcChoicesInputs) {
      if (pwcChoicesInputs.hasOwnProperty(key)) {
        const ci = pwcChoicesInputs[key];
        console.log(ci);
        const value = await ci.getValue(returnOnlyValuesForPwcSelects);
        resultObj[ci.name] = value;
      }
    }

    return resultObj;
  }

  componentWillLoad() {
    this.onConfigChanged(this.config);
    console.log(this.resolvedConfig);
  }

  render() {
    return (
      <form>
        <slot />
      </form>
    );
  }
}
