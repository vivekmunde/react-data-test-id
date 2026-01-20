# react-data-test-id

A context-based utility for composing predictable, readable, and unique test IDs in React apps.

## Why `data-test-ids` exist?

Data attributes such as `data-testid` provide stable selectors for automation testing. They are resilient to DOM structure changes, avoid brittle class name or layout selectors, and keep tests focused on user-visible intent. As UI codebases evolve, markup and styling can change without altering behavior. Test IDs give teams a durable contract for automation tooling like React Testing Library, Playwright, or Cypress.

Test IDs are most effective when they are consistent and scoped to the part of the UI where a component lives. This library uses React context to build that scope automatically so each component only declares its own segment instead of manually concatenating strings.

## What the context-based approach solves?

- Eliminates hard-coded, scattered test IDs across the codebase.
- Avoids collisions when the same component appears in different parts of the UI.
- Keeps IDs stable as components move within the same scope hierarchy.

Example without context (hard to maintain):

```tsx
<button data-testid="settings-profile-save-button">Save</button>
```

Example with context (composable and stable):

```tsx
<DataTestIdRoot value="auth">
  <div>
    <DataTestIdScope value="verify">
      <DataTestId value="email">
        <input type="text" />
      </DataTestId>
      <DataTestId value="submit">
        <button type="button">Login</button>
      </DataTestId>
    </DataTestIdScope>
  </div>
</DataTestIdRoot>
```

Generated HTML:

```html
<div data-testid="auth-verify">
  <input data-testid="auth-verify-email" />
  <button data-testid="auth-verify-submit">Login</button>
</div>
```

## Context-based approach

`DataTestIdRoot` establishes a root scope. Each `DataTestId` appends a segment and applies the resulting value to its child element. This gives you:

- Unique per context IDs because nested scopes inherit and extend the parent scope.
- Composable scopes because layout boundaries can define scope without touching leaf components.
- Stability because only meaningful structural changes alter the resulting IDs.
- Effortless uniqueness because the scope hierarchy prevents collisions.
- Local responsibility because each component owns only its own `value` segment.

## How it works?

Workflow summary:

1. `DataTestIdRoot` starts a scope at a page, feature, or component boundary.
2. `DataTestId` appends a segment and applies the resulting ID to its child.
3. Each nested `DataTestId` extends the scope so leaf elements get a unique, hierarchical ID.

```
App
└─ DataTestIdRoot(value="app")
   └─ DataTestId(value="settings")
      └─ DataTestId(value="profile")
         └─ DataTestId(value="save")
            └─ <button />

Resulting ID: "app-settings-profile-save"
```

Example:

```tsx
<DataTestIdRoot value="app">
  <div>
    <DataTestId value="settings">
      <section>
        <DataTestId value="profile">
          <form>
            <DataTestId value="email">
              <input type="text" />
            </DataTestId>
            <DataTestId value="save">
              <button type="button">Save</button>
            </DataTestId>
          </form>
        </DataTestId>
      </section>
    </DataTestId>
  </div>
</DataTestIdRoot>
```

Generated HTML:

```html
<div data-testid="app">
  <section data-testid="app-settings">
    <form data-testid="app-settings-profile">
      <input data-testid="app-settings-profile-email" />
      <button data-testid="app-settings-profile-save">Save</button>
    </form>
  </section>
</div>
```

## What is scope?

A scope is the current path of segments that describe where a component lives in the UI hierarchy. Each segment is a meaningful label like `page`, `section`, or `button`. The final `data-testid` is the joined scope path.

Example:

```tsx
<DataTestIdRoot value="dashboard">
  <div>
    <DataTestIdScope value="filters">
      <DataTestId value="gender">
        <select>...</select>
      </DataTestId>
      <DataTestId value="apply">
        <button type="button">Apply</button>
      </DataTestId>
    </DataTestIdScope>
  </div>
</DataTestIdRoot>
```

Generated HTML:

```html
<div data-testid="dashboard">
  <select data-testid="dashboard-filters-gender" />
  <button data-testid="dashboard-filters-apply">Apply</button>
</div>
```

## Installation

```bash
npm install --save react-data-test-id
```

```bash
yarn add react-data-test-id
```

## Usage

### Page

Core components like Label, Value, and Item apply `DataTestId` internally.

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const Label = (props) => {
  return (
    <DataTestId value="label">
      <label {...props} />
    </DataTestId>
  );
};
```

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const Value = (props) => {
  return (
    <DataTestId value="value">
      <span {...props} />
    </DataTestId>
  );
};
```

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const Item = ({ name, ...props }) => {
  return (
    <DataTestId value={name}>
      <div {...props} />
    </DataTestId>
  );
};
```

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const ProfilePage = () => {
  return (
    <DataTestIdRoot value="profile">
      <div>
        <Item name="name">
          <Label>Name</Label>
          <Value>John</Value>
        </Item>
        <Item name="email">
          <Label>Email</Label>
          <Value>john@example.com</Value>
        </Item>
      </div>
    </DataTestIdRoot>
  );
};
```

Generated HTML:

```html
<div data-testid="profile">
  <div data-testid="profile-name">
    <label data-testid="profile-name-label">Name</label>
    <span data-testid="profile-name-value">John</span>
  </div>
  <div data-testid="profile-email">
    <label data-testid="profile-email-label">Email</label>
    <span data-testid="profile-email-value">john@example.com</span>
  </div>
</div>
```

### Form

Core components like Input, Button, and Field apply `DataTestId` internally.

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const Label = (props) => {
  return (
    <DataTestId value="label">
      <label {...props} />
    </DataTestId>
  );
};
```

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const Input = (props) => {
  return (
    <DataTestId value="input">
      <input {...props} />
    </DataTestId>
  );
};
```

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const Button = (props) => {
  return (
    <DataTestId value="button">
      <button {...props} />
    </DataTestId>
  );
};
```

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const Field = ({ name, ...props }) => {
  return (
    <DataTestId value={name}>
      <div {...props} />
    </DataTestId>
  );
};
```

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

const EditProfilePage = () => {
  return (
    <DataTestIdRoot value="edit-profile">
      <form>
        <Field name="name">
          <Label>Name</Label>
          <Input type="text" />
        </Field>
        <Field name="email">
          <Label>Email</Label>
          <Input type="text" />
        </Field>
        <DataTestId value="save">
          <Button type="button">Save</Button>
        </DataTestId>
      </form>
    </DataTestIdRoot>
  );
};
```

Generated HTML:

```html
<form data-testid="edit-profile">
  <div data-testid="edit-profile-name">
    <label data-testid="edit-profile-name-label">Name</label>
    <input data-testid="edit-profile-name-input" />
  </div>
  <div data-testid="edit-profile-email">
    <label data-testid="edit-profile-email-label">Email</label>
    <input data-testid="edit-profile-email-input" />
  </div>
  <button data-testid="edit-profile-save-button">Save</button>
</form>
```

## Configuration

Use `DataTestIdConfigurationProvider` to override defaults:

```tsx
import React from "react";
import { DataTestIdConfigurationProvider } from "react-data-test-id";

const App = () => {
  return (
    <DataTestIdConfigurationProvider
      value={{
        enabled: true,
        dataAttributeName: "data-testid",
        scopeSeparator: "-",
        scopeTrasnformers: []
      }}
    >
      {/* app */}
    </DataTestIdConfigurationProvider>
  );
};
```

### Configuration options

| Option              | Type                               | Default         | Description                                          | Example                                                 |
| ------------------- | ---------------------------------- | --------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| `enabled`           | `boolean`                          | `true`          | Enables or disables test ID output.                  | `{ enabled: false }`                                    |
| `dataAttributeName` | `string`                           | `"data-testid"` | Attribute name applied to elements.                  | `{ dataAttributeName: "data-qa" }`                      |
| `scopeSeparator`    | `string`                           | `"-"`           | Separator used to join scope segments.               | `{ scopeSeparator: ":" }`                               |
| `scopeTrasnformers` | `Array<(value: string) => string>` | `[]`            | Transformers applied to each segment before joining. | `{ scopeTrasnformers: [value => value.toUpperCase()] }` |

### Transformers

Transformers allow you to normalize or enforce conventions on segments.

#### Available transformers:

```tsx
import {
  convertToLowerCase,
  convertToUpperCase,
  replaceSpaceWith,
  replaceWith
} from "react-data-test-id";
```

- `convertToLowerCase` converts a segment to lower case.
- `convertToUpperCase` converts a segment to upper case.
- `replaceSpaceWith(replaceValue)` replaces whitespace with the provided value.
- `replaceWith(searchValue, replaceValue)` replaces matches for a RegExp.

```tsx
import React from "react";
import { DataTestIdConfigurationProvider } from "react-data-test-id";

const App = () => {
  return (
    <DataTestIdConfigurationProvider
      value={{
        scopeTrasnformers: [
          convertToLowerCase,
          replaceSpaceWith("-"),
          replaceWith(/[^a-z0-9-]/gi, "")
        ]
      }}
    >
      {/* app */}
    </DataTestIdConfigurationProvider>
  );
};
```

```tsx
<DataTestIdRoot value="Profile">
  <DataTestId value="Save!">
    <button type="button">Save</button>
  </DataTestId>
</DataTestIdRoot>
```

Generated HTML:

```html
<button data-testid="profile-save">Save</button>
```

#### Custom transformers:

```tsx
import React from "react";
import { DataTestIdConfigurationProvider, DataTestIdRoot, DataTestId } from "react-data-test-id";

const kebabCase = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const App = () => {
  return (
    <DataTestIdConfigurationProvider value={{ scopeTrasnformers: [kebabCase] }}>
      <DataTestIdRoot value="User Profile">
        <DataTestId value="Save Changes">
          <button type="button">Save</button>
        </DataTestId>
      </DataTestIdRoot>
    </DataTestIdConfigurationProvider>
  );
};
```

Generated HTML:

```html
<button data-testid="user-profile-save-changes">Save</button>
```

## Components

### DataTestIdRoot

Starts a root scope and applies the resulting ID to its child.

```tsx
<DataTestIdRoot value="settings">
  <button type="button">Save</button>
</DataTestIdRoot>
```

Generated HTML:

```html
<button data-testid="settings">Save</button>
```

### DataTestIdRootScope

Resets the scope chain. Use this when a subtree should start a new scope.

```tsx
<DataTestIdRoot value="page">
  <DataTestIdRootScope value="modal">
    <DataTestId value="close">
      <button type="button">Close</button>
    </DataTestId>
  </DataTestIdRootScope>
</DataTestIdRoot>
```

Generated HTML:

```html
<button data-testid="modal-close">Close</button>
```

### DataTestId

Appends a scope segment in the scope hierarchy and applies the resulting ID to its child.

```tsx
<DataTestId value="toolbar">
  <div>
    <DataTestId value="home">
      <button type="button">Home</button>
    </DataTestId>
    <DataTestId value="refresh">
      <button type="button">Refresh</button>
    </DataTestId>
  </div>
</DataTestId>
```

Generated HTML:

```html
<div data-testid="toolbar">
  <button data-testid="toolbar-home">Home</button>
  <button data-testid="toolbar-refresh">Refresh</button>
</div>
```

### DataTestIdScope

Adds a scope segment in the hierarchy without applying an attribute, useful for layout boundaries.

```tsx
<DataTestId value="filters">
  <div>
    <DataTestIdScope value="input">
      <DataTestId value="gender">
        <select>...</select>
      </DataTestId>
      <DataTestId value="age">
        <select>...</select>
      </DataTestId>
    </DataTestIdScope>
    <DataTestIdScope value="actions">
      <DataTestId value="apply">
        <button type="button">Apply</button>
      </DataTestId>
      <DataTestId value="clear">
        <button type="button">Clear</button>
      </DataTestId>
    </DataTestIdScope>
  </div>
</DataTestId>
```

Generated HTML:

```html
<div data-testid="filters">
  <select data-testid="filters-input-gender" />
  <select data-testid="filters-input-age" />
  <button data-testid="filters-actions-apply">Apply</button>
  <button data-testid="filters-actions-clear">Clear</button>
</div>
```

## Best practices

- Apply `DataTestId` inside core UI components (Button, Input, Label, Select) so every usage is automatically tagged.

### Example

```tsx
const Input = (props) => {
  return (
    <DataTestId value="input">
      <input {...props} />
    </DataTestId>
  );
};
```

```tsx
const Button = (props) => {
  return (
    <DataTestId value="button">
      <button {...props} />
    </DataTestId>
  );
};
```

```tsx
const Toolbar = () => {
  return (
    <DataTestIdRoot value="toolbar">
      <Button type="button">Refresh</Button>
    </DataTestIdRoot>
  );
};
```

Generated HTML:

```html
<button data-testid="toolbar-button">Refresh</button>
```

- Add IDs at multiple levels of the hierarchy; the scope chain keeps them unique without manual concatenation.

### Example

```tsx
<DataTestIdRoot value="orders">
  <DataTestId value="list">
    <DataTestId value="row">
      <DataTestId value="status">
        <span>Shipped</span>
      </DataTestId>
    </DataTestId>
  </DataTestId>
</DataTestIdRoot>
```

Generated HTML:

```html
<span data-testid="orders-list-row-status">Shipped</span>
```

- Use meaningful, context‑based names like `profile`, `age`, `email`, `save`, or `filters`.

### Example

```tsx
<DataTestIdRoot value="profile">
  <DataTestId value="age">
    <input type="number" />
  </DataTestId>
  <DataTestId value="save">
    <button type="button">Save</button>
  </DataTestId>
</DataTestIdRoot>
```

Generated HTML:

```html
<input data-testid="profile-age" /> <button data-testid="profile-save">Save</button>
```

- Treat scope segments like a path: page → section → component → element.

### Example

```tsx
<DataTestIdRoot value="dashboard">
  <DataTestId value="filters">
    <DataTestId value="date-range">
      <input type="text" />
    </DataTestId>
  </DataTestId>
</DataTestIdRoot>
```

Generated HTML:

```html
<input data-testid="dashboard-filters-date-range" />
```

- Avoid over‑specific or visual names; prefer intent‑based names that survive layout changes.

### Example

```tsx
<DataTestIdRoot value="checkout">
  <DataTestId value="summary">
    <DataTestId value="total">
      <span>$42.00</span>
    </DataTestId>
  </DataTestId>
</DataTestIdRoot>
```

Generated HTML:

```html
<span data-testid="checkout-summary-total">$42.00</span>
```

## Internal building blocks

### Components

#### DataTestIdAttribute

`DataTestIdAttribute` is usually used internally by `DataTestIdRoot` and `DataTestId`. You will rarely need to use it directly unless you want to apply the current scope to a single child element by hand.

Applies the current scope to a single child element. Useful when a component already has a scope from its parent but needs to set the attribute explicitly.

```tsx
<DataTestIdScope value="search">
  <DataTestIdAttribute>
    <input type="text" />
  </DataTestIdAttribute>
</DataTestIdScope>
```

Generated HTML:

```html
<input type="text" data-testid="search" />
```

### Hooks

These hooks are mostly used internally, but they are available if you need to read the current configuration or scope in custom components.

#### useDataTestIdConfiguration

Returns the current configuration from context.

```tsx
const { enabled, dataAttributeName } = useDataTestIdConfiguration();
```

#### useDataTestIdScope

Returns the current scope string.

```tsx
const scope = useDataTestIdScope();
```

#### useTransformers

Applies configured transformers to a value.

```tsx
const transformed = useTransformers("Profile");
```

#### useJoinScopes

Joins scope segments using the configured separator.

```tsx
const joined = useJoinScopes(["app", "nav", "item"]);
```

## License

MIT
