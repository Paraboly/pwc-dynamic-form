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
  private resolvedItems: ButtonItemConfig[] = [];

  private readonly defaultItems = [];
  @Prop() items: string | ButtonItemConfig[] = this.defaultItems;
  @Watch("items")
  onItemsChanged(newValue: string | ButtonItemConfig[]) {
    if (newValue === null || newValue === undefined) {
      this.items = this.defaultItems;
    } else {
      this.resolvedItems = resolveJson(newValue);
    }
  }

  componentWillLoad() {
    this.onItemsChanged(this.items);
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
