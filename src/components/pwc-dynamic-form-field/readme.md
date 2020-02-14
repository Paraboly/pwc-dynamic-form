# my-component



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                                            | Default     |
| -------- | --------- | ----------- | --------------------------------------------------------------- | ----------- |
| `config` | --        |             | `NativeInputConfig \| PwcChoicesConfig \| PwcColorPickerConfig` | `undefined` |


## Events

| Event          | Description | Type                                    |
| -------------- | ----------- | --------------------------------------- |
| `fieldChanged` |             | `CustomEvent<FieldChangedEventPayload>` |


## Methods

### `getValue() => Promise<string | boolean | string[]>`



#### Returns

Type: `Promise<string | boolean | string[]>`




## Dependencies

### Used by

 - [pwc-dynamic-form-content](../pwc-dynamic-form-content)

### Depends on

- pwc-color-picker
- pwc-choices

### Graph
```mermaid
graph TD;
  pwc-dynamic-form-field --> pwc-color-picker
  pwc-dynamic-form-field --> pwc-choices
  pwc-choices --> pwc-choices-input-bar
  pwc-choices --> pwc-choices-dropdown
  pwc-choices-input-bar --> pwc-choices-option-bubble
  pwc-choices-dropdown --> pwc-choices-dropdown-item
  pwc-dynamic-form-content --> pwc-dynamic-form-field
  style pwc-dynamic-form-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
