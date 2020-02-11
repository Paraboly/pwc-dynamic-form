# my-component



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                            | Default     |
| -------- | --------- | ----------- | ------------------------------- | ----------- |
| `items`  | `items`   |             | `ContentItemConfig[] \| string` | `undefined` |


## Methods

### `getFieldRefs() => Promise<HTMLPwcDynamicFormFieldElement[]>`



#### Returns

Type: `Promise<HTMLPwcDynamicFormFieldElement[]>`




## Dependencies

### Depends on

- [pwc-dynamic-form-field](../pwc-dynamic-form-field)

### Graph
```mermaid
graph TD;
  pwc-dynamic-form-content --> pwc-dynamic-form-field
  pwc-dynamic-form-field --> pwc-color-picker
  pwc-dynamic-form-field --> pwc-choices
  pwc-choices --> pwc-choices-input-bar
  pwc-choices --> pwc-choices-dropdown
  pwc-choices-input-bar --> pwc-choices-option-bubble
  style pwc-dynamic-form-content fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
