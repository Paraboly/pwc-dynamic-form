import { Component, h, Prop, Watch } from "@stencil/core";
import { resolveJson } from "../../utils/utils";
import { ItemType } from "./ButtonsConfig";

@Component({
  tag: "pwc-dynamic-form-buttons",
  styleUrl: "pwc-dynamic-form-buttons.css",
  shadow: false
})
export class PwcDynamicFormButtonsComponent {
  private resolvedItems: ItemType[];

  @Prop() items: string | ItemType[];

  @Watch("items")
  onConfigChanged(items: string | ItemType[]) {
    this.resolvedItems = resolveJson(items);
  }

  componentWillLoad() {
    this.onConfigChanged(this.items);
  }

  private constructButton(button: ItemType): HTMLInputElement {
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
