import { Component, h, Prop, Watch, Listen } from "@stencil/core";
import { DynamicFormConfig } from "./DynamicFormConfig";
import { resolveJson } from "../../utils/utils";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: false
})
export class PwcDynamicFormComponent {
  private resolvedConfig: DynamicFormConfig.Root;

  @Prop() config: string | DynamicFormConfig.Root;

  @Watch("config")
  onConfigChanged(config: string | DynamicFormConfig.Root) {
    this.resolvedConfig = resolveJson(config);
  }

  @Listen("submit")
  handleSubmit(event: any) {
    console.log("handleSubmitButtonClicked", event);
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
