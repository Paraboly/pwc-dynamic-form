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
  private resolvedItems: ContentItemConfig[] = [];
  private fieldRefs: HTMLPwcDynamicFormFieldElement[] = [];
  private itemsAddedViaMethod: ContentItemConfig[] = [];

  @Element() rootElement: HTMLPwcDynamicFormContentElement;

  private readonly defaultItems = [];
  @Prop() items: string | ContentItemConfig[] = this.defaultItems;
  @Watch("items")
  itemsWatchHandler(newValue: string | ContentItemConfig[]) {
    if (newValue === null || newValue === undefined) {
      this.items = this.defaultItems;
    } else {
      this.resolvedItems = [
        ...resolveJson(newValue),
        ...this.itemsAddedViaMethod
      ];
    }
  }

  @Method()
  async addItem(config: ContentItemConfig) {
    if (config) {
      this.itemsAddedViaMethod = [...this.itemsAddedViaMethod, config];
      this.resolvedItems = [...this.resolvedItems, config];
      this.rootElement.forceUpdate();
    }
  }

  @Method()
  async removeItem(id: string) {
    if (id !== null || id !== undefined) {
      _.remove(this.itemsAddedViaMethod, { id });
      _.remove(this.resolvedItems, { id });
      this.rootElement.forceUpdate();
    }
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
    if (fieldConfig) {
      let nameIndexer = 0;
      const nameGenerator = () => {
        return "pwc-dynamic-form___generated-name-" + nameIndexer++;
      };

      let idIndexer = 0;
      const idGenerator = () => {
        return "pwc-dynamic-form___generated-id-" + idIndexer++;
      };

      fieldConfig.name = fieldConfig.name || nameGenerator();
      fieldConfig.id = fieldConfig.id || idGenerator();

      return (
        <pwc-dynamic-form-field
          key={fieldConfig.id + fieldConfig.name}
          config={fieldConfig}
          ref={this.handleFieldRef.bind(this, fieldConfig)}
        ></pwc-dynamic-form-field>
      );
    } else {
      return "";
    }
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
