# my-component



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                            | Default     |
| -------- | --------- | ----------- | ------------------------------- | ----------- |
| `items`  | `items`   |             | `ContentItemConfig[] \| string` | `undefined` |


## Events

| Event          | Description | Type                                    |
| -------------- | ----------- | --------------------------------------- |
| `fieldChanged` |             | `CustomEvent<FieldChangedEventPayload>` |


## Dependencies

### Depends on

- color-picker
- pwc-choices

### Graph
```mermaid
graph TD;
  pwc-dynamic-form-content --> color-picker
  pwc-dynamic-form-content --> pwc-choices
  pwc-choices --> pwc-choices-input-bar
  pwc-choices --> pwc-choices-dropdown
  pwc-choices-input-bar --> pwc-choices-option-bubble
  style pwc-dynamic-form-content fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
