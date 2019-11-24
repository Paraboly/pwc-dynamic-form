import { Component, h, Prop, Watch } from "@stencil/core";
import { DynamicFormButtonsConfig } from "./DynamicFormButtonsConfig";

@Component({
  tag: "pwc-dynamic-form-buttons",
  styleUrl: "pwc-dynamic-form-buttons.css",
  shadow: false
})
export class PwcDynamicFormButtonsComponent {
  parsedConfig: any;

  private parseConfig(config: string | DynamicFormButtonsConfig.Root): void {
    this.parsedConfig =
      (config && typeof config === "string" && JSON.parse(config)) || config;
  }

  @Prop() config: string | DynamicFormButtonsConfig.Root;

  @Watch("config")
  onConfigChanged(newValue: string | DynamicFormButtonsConfig.Root) {
    this.parseConfig(newValue);
  }

  componentWillLoad() {
    this.onConfigChanged(this.config);
  }

  private constructButton(button: DynamicFormButtonsConfig.Button) {
    return <button>{button.label}</button>;
  }

  render() {
    return (
      <div>
        {this.parsedConfig.buttons.map(
          (button: DynamicFormButtonsConfig.Button) =>
            this.constructButton(button)
        )}
      </div>
    );
  }
}
