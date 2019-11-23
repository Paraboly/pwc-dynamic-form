import { Component, h, Element } from "@stencil/core";
import CaptureTest from "../shadow-dom-event-capture-test/shadow-dom-event-capture-test";

@Component({
  tag: "shadow-dom-test",
  shadow: true
})
export class ShadowDomTestComponent {
  @Element() rootElement: HTMLElement;

  componentDidLoad() {
    const buttonElement = this.rootElement.shadowRoot.querySelector("button");
    console.log(buttonElement);
    const tester = new CaptureTest(buttonElement);
  }

  render() {
    return (
      <div>
        <button>Click me</button>
      </div>
    );
  }
}
