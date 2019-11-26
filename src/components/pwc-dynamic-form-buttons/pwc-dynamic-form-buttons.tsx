import { Component, h, Prop, Watch } from "@stencil/core";
import { DynamicFormButtonsConfig } from "./DynamicFormButtonsConfig";

@Component({
  tag: "pwc-dynamic-form-buttons",
  styleUrl: "pwc-dynamic-form-buttons.css",
  shadow: false
})
export class PwcDynamicFormButtonsComponent {
  private resolvedConfig: DynamicFormButtonsConfig.Root;

  @Prop() config: string | DynamicFormButtonsConfig.Root;

  @Watch("config")
  onConfigChanged(config: string | DynamicFormButtonsConfig.Root) {
    this.resolvedConfig = resolveJson(config);
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
        {this.resolvedConfig.buttons.map(
          (button: DynamicFormButtonsConfig.Button) =>
            this.constructButton(button)
        )}
      </div>
    );
  }
}
