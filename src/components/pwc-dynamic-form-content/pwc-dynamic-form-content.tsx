import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { Component, Element, h, Prop, Watch, Method } from "@stencil/core";
import { resolveJson } from "../../utils/utils";
import { ContentItemConfig } from "../pwc-dynamic-form-field/ContentItemConfig";
import _ from "lodash";

@Component({
  tag: "pwc-dynamic-form-content",
  styleUrl: "pwc-dynamic-form-content.css",
  shadow: false
})
export class PwcDynamicFormContent {
  private resolvedItems: ContentItemConfig[];
  private fieldRefs: HTMLPwcDynamicFormFieldElement[];

  @Element() rootElement: HTMLPwcDynamicFormContentElement;

  @Prop() items: string | ContentItemConfig[];
  @Watch("items")
  itemsWatchHandler(items: string | ContentItemConfig[]) {
    this.resolvedItems = resolveJson(items);
  }

  @Method()
  async getFieldRefs() {
    return this.fieldRefs;
  }

  componentWillLoad() {
    this.itemsWatchHandler(this.items);
  }

  handleFieldRef(
    fieldConfig: ContentItemConfig,
    fieldRef: HTMLPwcDynamicFormFieldElement
  ) {
    if (fieldRef) {
      this.fieldRefs = _.unionBy(
        this.fieldRefs,
        [fieldRef],
        i => i.config.name
      );
    } else {
      _.remove(this.fieldRefs, i => i.config.name === fieldConfig.name);
    }
  }

  constructField(fieldConfig: ContentItemConfig) {
    let nameIndexer = 0;
    const nameGenerator = name => {
      return name || "pwc-dynamic-form___generated-name-" + nameIndexer++;
    };

    fieldConfig.name = nameGenerator(fieldConfig.name);

    return (
      <pwc-dynamic-form-field
        config={fieldConfig}
        ref={this.handleFieldRef.bind(this, fieldConfig)}
      ></pwc-dynamic-form-field>
    );
  }

  render() {
    if (this.resolvedItems) {
      // we are mutating the config, therefore we have to clone it to leave the user input intact.
      const resolvedItemsClone = _.cloneDeep(this.resolvedItems);
      return resolvedItemsClone.map(this.constructField.bind(this));
    } else {
      return "";
    }
  }
}
