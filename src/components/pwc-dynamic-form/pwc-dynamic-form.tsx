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
import { getVanillaHtmlInputs } from "../../utils/utils";
import { FormChangedEventPayload } from "./FormChangedEventPayload";
import { FieldChangedEventPayload } from "../pwc-dynamic-form-content/FieldChangedEventPayload";
import { FormValuesType } from "./FormValuesType";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: false
})
export class PwcDynamicForm {
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
    const form: HTMLFormElement = this.rootElement.querySelector("form");
    const resultObj: FormValuesType = {};

    // vanilla html inputs
    const vanillaInputs = getVanillaHtmlInputs(
      this.rootElement.querySelector("pwc-dynamic-form-content"),
      true
    );

    vanillaInputs.forEach(vf => {
      if (vf.type === "checkbox") {
        resultObj[vf.name] = vf.checked;
      } else {
        resultObj[vf.name] = vf.value;
      }
    });

    // pwc-choices
    const pwcChoicesInputs = form.querySelectorAll("pwc-choices");

    for (const key in pwcChoicesInputs) {
      if (pwcChoicesInputs.hasOwnProperty(key)) {
        const ci = pwcChoicesInputs[key];
        const value = await ci.getSelectedOptionsAsValues();
        resultObj[ci.name] = value;
      }
    }

    // pwc-color-picker
    const PwcColorPickers = this.rootElement.querySelectorAll(
      "pwc-color-picker"
    );
    for (const key in PwcColorPickers) {
      if (PwcColorPickers.hasOwnProperty(key)) {
        const cp = PwcColorPickers[key];
        const value = cp.activeColor;
        const name = cp.getAttribute("name");
        resultObj[name] = value;
      }
    }

    return resultObj;
  }

  render() {
    return (
      <form>
        <slot />
      </form>
    );
  }
}
