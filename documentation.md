# Structure

```html
<pwc-dynamic-form>
  <pwc-dynamic-form-content> </pwc-dynamic-form-content>
  <pwc-dynamic-form-buttons> </pwc-dynamic-form-buttons>
</pwc-dynamic-form>
```

# `pwc-dynamic-form`

## Render structure

```html
<form>
  <slot />
</form>
```

## `formChanged` Event

`formChanged: EventEmitter<PwcDynamicForm.FormChangedEventPayload>`

Emitted when there is a change in the form.

A change can be a field change or a form reset.

### Payload

```ts
type: "change" | "reset";
fieldChangedEventPayload: FieldChangedEventPayload;
formResetEvent: Event;
formValues: { [key: string]: boolean | string | string[] };
formElement: HTMLPwcDynamicFormElement;
```

- `type`: type of the change. `change` if the event is raised due to a field change. `reset` if the event is raised due to a form reset.
- `fieldChangedEventPayload`: (valid if type is `change`) payload of the
- `fieldChangedEvent` that caused this event to be raised.
- `fieldChangedEventPayload`: (valid if type is `reset`) the `reset` event that caused this event to be raised.
- `formValues`: current form values (no the values before the event, but the new ones).
- `formElement`: the `<pwc-dynamic-form>` element.

## `getFieldValues` Method

`async getFieldValues(returnOnlyValuesForPwcSelects: boolean = false): Promise<{ [key: string]: boolean | string | string[] }>`

### Parameters

- `returnOnlyValuesForPwcSelects`: Optional, defaults to false. If true, the values of `pwc-choices` fields will be object arrays containing choice objects, as passed to the items configuration. If false, they will be string arrays containing only values of each choice object.

# `pwc-dynamic-form-content`

## Render structure

```html
<div>
  Generated fields
</div>
```

## `items` Prop

`items: string | PwcDynamicForm.ContentItemConfig[]`

This prop is our configuration for the form fields.

### Example

```js
dynamicFormContent.items = [
  {
    type: "select-single",
    name: "single-select-1",
    id: "single-select-1",
    label: "This is a label!",
    distinct: "value",
    choices: [
      {
        value: "superstar",
        label: "Superstar"
      },
      {
        value: "foo",
        label: "bar"
      }
    ]
  },
  {
    type: "checkbox",
    name: "checkbox_1",
    id: "checkbox_1",
    label: "This is another label!"
  }
];
```

### `PwcDynamicForm.ContentItemConfig` type union

`type ContentItemConfig = NativeInputConfig | PwcSelectConfig | ColorPickerConfig`

This type is a union of the supported interfaces for the fields.

#### `NativeInputConfig` interface

```ts
export interface NativeInputConfig
  extends JSXBase.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
```

This interface is used for native HTML input fields.

- `label`: Translated into a `<label>` element for our generated element.

You can also pass in all valid HTML attributes of an `<input>` tag, alongside the custom fields listed above.

#### `PwcSelectConfig` interface

```ts
export interface PwcSelectConfig
  extends JSXBase.InputHTMLAttributes<HTMLPwcChoicesElement> {
  type: "select-single" | "select-multiple" | "select-text";
  label: string;
  choices: Array<any>;
  distinct?: "value" | "label" | "all" | "none";
}
```

This interface is used for [`pwc-choices`](https://github.com/Paraboly/pwc-choices) web components.

- `type`: The type of the generated `pwc-choices` web component. Mapping:

  - `select-single` -> `single`
  - `select-multiple` -> `multiple`
  - `select-text` -> `text`

- `label`: Translated into a `<label>` element for our generated element.

- `choices`: The array of choice objects for this element. A usual choice object looks like this:

```js
{
    label: "Superstar",
    value: "superstar",
    selected: false, // optional
    disabled: false, // optional
    /* any other custom field you wish can also be passed */
}
```

- `distinct`: (optional) The type of distinct filter to be applied to the choices. See: [pwc-choices documentation](https://github.com/Paraboly/pwc-choices#configuration).

You can also pass in all valid HTML attributes of an `<pwc-choices>` tag, alongside the custom fields listed above.

#### `ColorPickerConfig` interface

```ts
export interface ColorPickerConfig
  extends JSXBase.InputHTMLAttributes<HTMLColorPickerElement> {
  label: string;
}
```

This interface is used for [`color-picker`](https://github.com/Paraboly/pwc-color-picker) web components.

You can pass in all valid HTML attributes of a `<color-picker>` tag. The label field is translated into a `<label>` element for our generated element.

## `fieldChanged` Event

`fieldChanged: EventEmitter<PwcDynamicForm.FieldChangedEventPayload>`

This event is emitted whenever a field changes.

### Payload

```ts
element: HTMLInputElement | HTMLPwcChoicesElement | HTMLColorPickerElement;
newValue: string | string[];
originalEvent: Event | CustomEvent;
```

- `element`: The form element that changed.
- `newValue`: The new value of the element that changed.
- `originalEvent`: The original event that caused this event to be raised.

## Element Generation

The type of the generated element is determined with the `type` field in the element's configuration object, in `items` prop:

- `color` -> `<color-picker>`
- `select-single` -> `<pwc-choices>` with single select config.
- `select-multiple` -> `<pwc-choices>` with multiple select config.
- `select-text` -> `<pwc-choices>` with text select config.
- Any other `type` -> `<input type="__TYPE__">`

The final generated structure will look like this:

```html
<div class="form-group">
  <label>
    Label
    <__GENERATED ELEMENT__></__GENERATED ELEMENT__>
  </label>
</div>
```

_**Note:** Placement of the label text depends on the generated element type._

### Example element generation for `pwc-choices`

Item config:

```js
{
  type: "select-single",
  name: "ss1-name",
  id: "ss1-id",
  label: "ss1-label",
  distinct: "value",
  choices: [
    {
      value: "superstar",
      label: "Superstar",
      selected: false,
      disabled: false
    },
    {
      value: "foo",
      label: "bar",
      selected: false,
      disabled: false
    }
  ]
}
```

Generated element:

```html
<div class="form-group">
  <label>
    ss1-label
    <pwc-choices
      type="single"
      name="ss1"
      id="ss1"
      distinct="value"
      choices='[
        {
          "value": "superstar",
          "label": "Superstar",
          "selected": false,
          "disabled": false
        },
        {
          "value": "foo",
          "label": "bar",
          "selected": false,
          "disabled": false
        }
      ]'
    ></pwc-choices>
  </label>
</div>
```

### Example element generation for a native HTML input

Item config:

```js
{
  type: "number",
  name: "number-input-name",
  id: "number-input-id",
  label: "This is a number input!",
  required: true
}
```

Generated element:

```html
<div class="form-group">
  <label>
    This is a number input!
    <input
      type="number"
      name="number-input-name"
      id="number-input-id"
      required
    ></input>
  </label>
</div>
```

### Notes

- For `color` and `checkbox` types, the label text is placed **after** the input element.

* More items will be supported soon, and we plan on implementing an interface, which you can use to add support for your own custom elements.

# `pwc-dynamic-form-buttons`

## Render structure

```html
<div>
  Generated buttons
</div>
```

## `items` Prop

`items: string | PwcDynamicForm.ButtonItemConfig[]`

This prop is our configuration for the form fields.

### `ButtonItemConfig` type

`ButtonItemConfig = JSXBase.InputHTMLAttributes<HTMLInputElement>`

You can pass in any valid attribute of an html `<input>` tag to an object of this type.

## Button Generation

The given config object for the button is simply translated into `<input {...config}></input>`.

### Example

Item config:

```js
{
  type: "submit",
  id: "foo",
  name: "bar"
}
```

Generated button:

```html
<input type="submit" id="foo" name="bar"></input>
```
