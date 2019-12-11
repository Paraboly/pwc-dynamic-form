import { Component, h, Prop, Watch } from "@stencil/core";
import { resolveJson } from "../../utils/utils";
import { PwcDynamicForm } from "../../utils/PwcDynamicForm";

@Component({
  tag: "pwc-dynamic-form-buttons",
  styleUrl: "pwc-dynamic-form-buttons.css",
  shadow: false
})
export class PwcDynamicFormButtonsComponent {
  private resolvedItems: PwcDynamicForm.ButtonItemConfig[];

  @Prop() items: string | PwcDynamicForm.ButtonItemConfig[];

  @Watch("items")
  onConfigChanged(items: string | PwcDynamicForm.ButtonItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  componentWillLoad() {
    this.onConfigChanged(this.items);
  }

  private constructButton(
    button: PwcDynamicForm.ButtonItemConfig
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
