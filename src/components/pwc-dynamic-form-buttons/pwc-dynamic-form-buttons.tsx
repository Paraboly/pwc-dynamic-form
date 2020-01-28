import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { Component, h, Prop, Watch } from "@stencil/core";
import { resolveJson } from "../../utils/utils";
import { ButtonItemConfig } from "./ButtonItemConfig";
import _ from "lodash";

@Component({
  tag: "pwc-dynamic-form-buttons",
  styleUrl: "pwc-dynamic-form-buttons.css",
  shadow: false
})
export class PwcDynamicFormButtons {
  private resolvedItems: ButtonItemConfig[];

  @Prop() items: string | ButtonItemConfig[];

  @Watch("items")
  onConfigChanged(items: string | ButtonItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  componentWillLoad() {
    this.onConfigChanged(this.items);
  }

  private constructButton(button: ButtonItemConfig): HTMLInputElement {
    return <input {...button}></input>;
  }

  render() {
    return this.resolvedItems
      ? this.resolvedItems.map(button => this.constructButton(button))
      : "";
  }
}
