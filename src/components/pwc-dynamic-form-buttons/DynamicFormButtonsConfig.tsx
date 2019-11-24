export declare module DynamicFormButtonsConfig {
  export interface Root {
    buttons: Button[];
  }

  export interface Button {
    label: "submit" | "cancel" | "reset";
  }
}
