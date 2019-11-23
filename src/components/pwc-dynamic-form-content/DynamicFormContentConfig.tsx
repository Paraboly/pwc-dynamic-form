export declare module DynamicFormContentConfig {
  export interface Root {
    fields: Field[];
  }

  export interface Field {
    type: string;
    id: string;
    label: string;
  }

  //
  // Input
  //

  export interface Input extends Field {
    inputType: string;
  }

  export interface Text extends Input {
    placeholder: string;
    value: string;
  }

  export interface Number extends Input {
    placeholder: string;
    value: string;
  }

  export interface Checkbox extends Input {
    checked: boolean;
  }

  //
  // Select
  //

  export interface Select extends Field {
    choices: string[];
  }

  export interface SingleSelect extends Select {}

  export interface MultiSelect extends Select {}
}
