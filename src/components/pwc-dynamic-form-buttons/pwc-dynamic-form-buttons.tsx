import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { Component, h, Prop, Watch } from "@stencil/core";
import { resolveJson } from "../../utils/utils";
import { PwcDynamicFormInterfaces } from "../../interfaces/pwc-dynamic-form-interfaces";

@Component({
  tag: "pwc-dynamic-form-buttons",
  styleUrl: "pwc-dynamic-form-buttons.css",
  shadow: false
})
export class PwcDynamicFormButtons {
  private resolvedItems: PwcDynamicFormInterfaces.ButtonItemConfig[];

  @Prop() items: string | PwcDynamicFormInterfaces.ButtonItemConfig[];

  @Watch("items")
  onConfigChanged(items: string | PwcDynamicFormInterfaces.ButtonItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  componentWillLoad() {
    this.onConfigChanged(this.items);
  }

  private constructButton(
    button: PwcDynamicFormInterfaces.ButtonItemConfig
  ): HTMLInputElement {
    return <input {...button}></input>;
  }

  render() {
    return (
      <div>
        {this.resolvedItems
          ? this.resolvedItems.map(button => this.constructButton(button))
          : ""}
      </div>
    );
  }
}
