import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import {
  Component,
  h,
  Listen,
  Method,
  Element,
  Event,
  EventEmitter
} from "@stencil/core";
import { FormChangedEventPayload } from "./FormChangedEventPayload";
import { FieldChangedEventPayload } from "../pwc-dynamic-form-field/FieldChangedEventPayload";
import { FormValuesType } from "./FormValuesType";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: false
})
export class PwcDynamicForm {
  private contentRef: HTMLPwcDynamicFormContentElement;

  @Element() rootElement: HTMLPwcDynamicFormElement;

  @Event() formChanged: EventEmitter<FormChangedEventPayload>;

  @Listen("fieldChanged")
  handleFieldChanged(fieldChangedEventPayload: FieldChangedEventPayload) {
    const rootElement = this.rootElement;
    this.getFieldValues().then(v => {
      const formChangedEventPayload: FormChangedEventPayload = {
        type: "change",
        fieldChangedEventPayload,
        formResetEvent: null,
        formValues: v,
        formElement: rootElement
      };
      this.formChanged.emit(formChangedEventPayload);
    });
  }

  @Listen("reset")
  handleFormReset(formResetEvent: Event) {
    const rootElement = this.rootElement;
    this.getFieldValues().then(v => {
      const formChangedEventPayload: FormChangedEventPayload = {
        type: "reset",
        fieldChangedEventPayload: null,
        formResetEvent,
        formValues: v,
        formElement: rootElement
      };
      this.formChanged.emit(formChangedEventPayload);
    });
  }

  @Method()
  async getFieldValues(): Promise<FormValuesType> {
    if (!this.contentRef) {
      return {};
    } else {
      const fieldRefs = await this.contentRef.getFieldRefs();
      const vals = {};

      for (const field of fieldRefs) {
        const val = await field.getValue();
        vals[field.config.name] = val;
      }

      return vals;
    }
  }

  componentDidRender() {
    this.contentRef = this.rootElement.querySelector(
      "pwc-dynamic-form-content"
    );
  }

  render() {
    return (
      <form>
        <slot />
      </form>
    );
  }
}
