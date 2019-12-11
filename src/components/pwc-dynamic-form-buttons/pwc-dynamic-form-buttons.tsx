import { Component, h, Prop, Watch } from "@stencil/core";
import { resolveJson } from "../../utils/utils";
import { PwcFilter } from "../../utils/PwcFilter";

@Component({
  tag: "pwc-dynamic-form-buttons",
  styleUrl: "pwc-dynamic-form-buttons.css",
  shadow: false
})
export class PwcDynamicFormButtonsComponent {
  private resolvedItems: PwcFilter.ButtonItemConfig[];

  @Prop() items: string | PwcFilter.ButtonItemConfig[];

  @Watch("items")
  onConfigChanged(items: string | PwcFilter.ButtonItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  componentWillLoad() {
    this.onConfigChanged(this.items);
  }

  private constructButton(
    button: PwcFilter.ButtonItemConfig
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
