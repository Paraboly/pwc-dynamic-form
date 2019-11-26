import { Component, h, Prop, Watch, Event, EventEmitter } from "@stencil/core";
import { DynamicFormButtonsConfig } from "./DynamicFormButtonsConfig";
import { resolveJson } from "../../utils/utils";

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

  @Event() submitButtonClicked: EventEmitter;
  @Event() resetButtonClicked: EventEmitter;

  componentWillLoad() {
    this.onConfigChanged(this.config);
  }

  private handleGeneratedButtonClick(
    button: DynamicFormButtonsConfig.Button,
    event: MouseEvent
  ) {
    switch (button.action) {
      case "submit":
        event.stopPropagation();
        event.preventDefault();
        this.submitButtonClicked.emit();
        break;
      case "reset":
        event.stopPropagation();
        event.preventDefault();
        this.resetButtonClicked.emit();
        break;
    }
  }

  private constructButton(button: DynamicFormButtonsConfig.Button) {
    return (
      <button
        formAction={button.action}
        onClick={e => this.handleGeneratedButtonClick(button, e)}
      >
        {button.label || button.action}
      </button>
    );
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
