import Enumerable from "linq";

export function resolveJson<TReturnType>(
  input: string | TReturnType
): TReturnType {
  return typeof input === "string" ? JSON.parse(input) : input;
}

export function getVanillaHtmlInputs(
  rootElement: HTMLElement
): HTMLInputElement[] {
  const allInputs = rootElement.querySelectorAll("input");
  return Enumerable.from(allInputs)
    .where(
      a =>
        false === Enumerable.from(a.classList).any(c => c.includes("choices__"))
    )
    .toArray();
}
