import { Component, h, Prop, Watch, Element } from "@stencil/core";
import { DynamicFormConfig } from "./DynamicFormConfig";
import "@paraboly/pwc-ibox";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: true
})
export class PwcDynamicFormComponent {
  private parsedConfig: DynamicFormConfig.Root;

  @Element() rootElement: HTMLElement;

  @Prop() config: string;

  @Watch("config")
  onConfigChanged(config: string) {
    this.parsedConfig = JSON.parse(config);
    this.config = config;
  }

  componentWillLoad() {
    this.rootElement.addEventListener("click", e => {
      if (e.target == this.rootElement) {
        e.composedPath().forEach(p => {
          let elm = p as HTMLElement;
          if (elm && elm.classList && elm.classList.contains("choices__list")) {
            console.log(elm);
          }
        });
      }
      return false;
    });

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
