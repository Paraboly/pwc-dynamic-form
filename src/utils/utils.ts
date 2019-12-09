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
    .where(
      a =>
        false ===
        (Enumerable.from(a.classList).any(c => c.includes("choices__")) ||
          (skipButtonElements && a.type === "button"))
    )
    .toArray();
}
