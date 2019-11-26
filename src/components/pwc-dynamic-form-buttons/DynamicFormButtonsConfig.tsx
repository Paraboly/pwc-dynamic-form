export declare module DynamicFormButtonsConfig {
  export interface Root {
    buttons: Button[];
  }

  export interface Button {
    action: "submit" | "reset";
    label: string;
  }
}
