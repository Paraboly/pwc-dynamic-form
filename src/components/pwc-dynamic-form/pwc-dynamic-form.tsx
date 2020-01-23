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
import { PwcDynamicFormInterfaces } from "../../interfaces/PwcDynamicFormInterfaces";
import { PwcChoicesInterfaces } from "@paraboly/pwc-choices/dist/types/interfaces/PwcChoicesInterfaces";

@Component({
  tag: "pwc-dynamic-form",
  styleUrl: "pwc-dynamic-form.css",
  shadow: false
})
export class PwcDynamicForm {
  @Element() rootElement: HTMLPwcDynamicFormElement;

  @Event() formChanged: EventEmitter<
    PwcDynamicFormInterfaces.FormChangedEventPayload
  >;

  @Listen("fieldChanged")
  handleFieldChanged(
    fieldChangedEventPayload: PwcDynamicFormInterfaces.FieldChangedEventPayload
  ) {
    const rootElement = this.rootElement;
    this.getFieldValues("value").then(v => {
      const formChangedEventPayload: PwcDynamicFormInterfaces.FormChangedEventPayload = {
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
    this.getFieldValues("value").then(v => {
      const formChangedEventPayload: PwcDynamicFormInterfaces.FormChangedEventPayload = {
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
  async getFieldValues(
    pwcChoicesRetreiveMode: PwcChoicesInterfaces.RetreiveMode
  ): Promise<{
    [key: string]: PwcDynamicFormInterfaces.FormValueTypeUnion;
  }> {
    const form: HTMLFormElement = this.rootElement.querySelector("form");
    const resultObj: {
      [key: string]: PwcDynamicFormInterfaces.FormValueTypeUnion;
    } = {};

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
        const value = await ci.getSelectedOptions(pwcChoicesRetreiveMode);
        resultObj[ci.name] = value;
      }
    }

    // color-picker
    const colorPickers = this.rootElement.querySelectorAll("color-picker");
    for (const key in colorPickers) {
      if (colorPickers.hasOwnProperty(key)) {
        const cp = colorPickers[key];
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
