import { Component, h, Prop, Watch } from "@stencil/core";
import { DynamicFormConfig } from "./DynamicFormConfig";
import "@paraboly/pwc-ibox";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: true
})
export class PwcDynamicFormComponent {
  private parsedConfig: DynamicFormConfig.Root;

  @Prop() config: string;

  @Watch("config")
  onConfigChanged(config: string) {
    this.parsedConfig = JSON.parse(config);
    this.config = config;
  }

  componentWillLoad() {
    this.onConfigChanged(this.config);
  }

  render() {
    return (
      <pwc-ibox>
        <pwc-ibox-title>
          {this.parsedConfig.title}
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

        <pwc-ibox-footer>{this.parsedConfig.footer}</pwc-ibox-footer>
      </pwc-ibox>
    );
  }
}
