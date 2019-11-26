import { Component, h, Prop, Watch } from "@stencil/core";
import { DynamicFormConfig } from "./DynamicFormConfig";
import "@paraboly/pwc-ibox";

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

  componentWillLoad() {
    this.onConfigChanged(this.config);
  }

  render() {
    return (
      <pwc-ibox>
        <pwc-ibox-title>
          {this.resolvedConfig.title}
          <pwc-ibox-tools
            minimize-button="true"
            close-button="true"
          ></pwc-ibox-tools>
        </pwc-ibox-title>

        <pwc-ibox-content>
          <form>
            <slot />
          </form>
        </pwc-ibox-content>

        <pwc-ibox-footer>{this.resolvedConfig.footer}</pwc-ibox-footer>
      </pwc-ibox>
    );
  }
}
