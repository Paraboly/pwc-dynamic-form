import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import { IOption as PwcChoicesIOption } from "@paraboly/pwc-choices/dist/types/components/pwc-choices/IOption";
export type FormValueTypeUnion =
  | boolean
  | string
  | string[]
  | PwcChoicesIOption[]
  | PwcChoicesIOption;
