import { Element } from "@stencil/core";

export declare module FormJson {
  export interface Element {
    name: string;
    type: string;
  }

  export interface Root {
    elements: Element[];
  }

  export interface LabelElement extends Element {
    content: string;
  }

  export interface InputElement extends Element {
    value: string;
    placeholder: string;
  }
}
