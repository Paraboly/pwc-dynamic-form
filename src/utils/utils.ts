import "@paraboly/pwc-choices";
import "@paraboly/pwc-color-picker";
import Enumerable from "linq";

export function resolveJson<TReturnType>(
  input: string | TReturnType
): TReturnType {
  return typeof input === "string" ? JSON.parse(input) : input;
}

export function getVanillaHtmlInputs(
  rootElement: HTMLElement,
  skipButtonElements: boolean
): HTMLInputElement[] {
  return Enumerable.from(rootElement.querySelectorAll("input"))
    .where(inputElement => {
      const inputElementParents = getAllParentElements(inputElement);

      const isChoices = Enumerable.from(inputElementParents).any(p =>
        p.tagName.includes("PWC-CHOICES")
      );
      const isButton = inputElement.type === "button";
      const isPwcColorPicker = Enumerable.from(inputElementParents).any(p =>
        p.tagName.includes("PWC-COLOR-PICKER")
      );
      return (
        false ===
        (isChoices || (skipButtonElements && isButton) || isPwcColorPicker)
      );
    })
    .toArray();
}

export function getAllParentElements(node: HTMLElement): HTMLElement[] {
  let a = node;
  const els = [];
  while (a) {
    els.unshift(a);
    a = a.parentElement;
  }
  return els;
}
