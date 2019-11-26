import { Component, h, Prop, Watch, Event, EventEmitter } from "@stencil/core";
import { DynamicFormButtonsConfig } from "./DynamicFormButtonsConfig";
import { resolveJson } from "../../utils/utils";
import { JSXBase } from "@stencil/core/dist/declarations";

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

  private constructButton(
    button: JSXBase.InputHTMLAttributes<HTMLInputElement>
  ): HTMLInputElement {
    return <input {...button}></input>;
  }

  render() {
    return (
      <div>
        {this.resolvedConfig.buttons.map(button =>
          this.constructButton(button)
        )}
      </div>
    );
  }
}
