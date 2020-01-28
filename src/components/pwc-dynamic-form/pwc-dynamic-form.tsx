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
import { FieldChangedEventPayload } from "../pwc-dynamic-form-content/FieldChangedEventPayload";
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
    const resultObj: FormValuesType = {};

    const vanillaInputs = await this.contentRef.getNativeInputRefs();
    vanillaInputs.forEach(vf => {
      if (vf.type === "checkbox") {
        resultObj[vf.name] = vf.checked;
      } else {
        resultObj[vf.name] = vf.value;
      }
    });

    const pwcChoicesInputs = await this.contentRef.getChoicesRefs();
    pwcChoicesInputs.forEach(
      async elm =>
        (resultObj[elm.name] = await elm.getSelectedOptionsAsValues())
    );

    const pwcColorPickers = await this.contentRef.getColorPickerRefs();
    pwcColorPickers.forEach(
      async elm => (resultObj[elm.getAttribute("name")] = elm.activeColor)
    );

    return resultObj;
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
