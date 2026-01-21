# react-data-test-id

A context-based utility for composing **predictable**, **readable** and **unique** **data-test-id**s in React apps for test automation.

## Why `data-test-ids` exist?

Data attributes such as `data-testid` provide stable selectors for automation testing. They are resilient to DOM structure changes, avoid brittle class name or layout selectors, and keep tests focused on user-visible intent. As UI codebases evolve, markup and styling can change without altering behavior. Test ID attributes give teams a durable contract for automation tooling like React Testing Library, Playwright, or Cypress.

Test IDs are most effective when they are consistent and scoped to the part of the UI where a component lives. This library uses React context to build that scope automatically so each component only declares its own segment instead of manually concatenating strings.

## What the context-based approach solves?

- Eliminates hard-coded, scattered test IDs across the codebase.
- Avoids collisions when the same component appears in different parts of the UI.
- Keeps IDs stable as components move within the same scope hierarchy.
- Makes the test IDs unique as per the context.
- Makes the test IDs predictable so that there are no surprises.

Non-context test IDs are hard to maintain, as shown below:

```tsx
<button data-testid="settings-profile-save-button">Save</button>
```

Context-based test IDs are composable, stable, and unique within a module:

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

**Generated HTML:**

```html
<div data-testid="auth-verify">
  <input data-testid="auth-verify-email" />
  <button data-testid="auth-verify-submit">Login</button>
</div>
```

## Context-based approach

`DataTestIdRoot` establishes a root scope. Each `DataTestId` adds one segment to the hierarchy and applies the joined scope to its child element. This creates:

- Unique per context IDs because nested scopes inherit and extend the parent scope.
- Composable scopes because layout boundaries can define scope without touching leaf components.
- Stability because only meaningful structural changes alter the resulting IDs.
- Effortless uniqueness because the scope hierarchy prevents collisions.
- Local responsibility because each component owns only its own `value` segment.
- Better developer experience by focusing on logic, styles, and HTML semantics.
- Component changes can happen without updating test IDs.

## How it works

Workflow summary:

1. `DataTestIdRoot` starts a scope at a page, feature, or component boundary.
2. `DataTestId` adds one segment and applies the joined scope to its child.
3. Each nested `DataTestId` extends the scope so leaf elements get unique, hierarchical IDs.

```
App
└─ DataTestIdRoot(value="app")
   └─ DataTestId(value="settings")
      └─ DataTestId(value="profile")
         └─ DataTestId(value="save")
```

Resulting unique & hierarchical IDs:

```
"app"
"app-settings"
"app-settings-profile"
"app-settings-profile-save"
```

### Example

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

**Generated HTML:**

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

A scope is the current path of segments in the component hierarchy. Each segment is a meaningful label like `page`, `section`, or `button`. The `data-testid` is the joined scope path.

### Example

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

**Generated HTML:**

```html
<div data-testid="dashboard">
  <select data-testid="dashboard-filters-gender" />
  <button data-testid="dashboard-filters-apply">Apply</button>
</div>
```

## Installation

#### NPM

```bash
npm install --save react-data-test-id
```

#### Yarn

```bash
yarn add react-data-test-id
```

## Usage

### Page

Core components like Label, Value, and Item apply `DataTestId` internally as part of the scope hierarchy.
This example shows a details section that renders label-value pairs.

**\<H3 />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const H3 = (props) => {
  return (
    <DataTestId value="title">
      <h3 {...props} />
    </DataTestId>
  );
};
```

**\<DetailsItemLabel />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const DetailsItemLabel = (props) => {
  return (
    <DataTestId value="label">
      <label {...props} />
    </DataTestId>
  );
};
```

**\<DetailsItemValue />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const DetailsItemValue = (props) => {
  return (
    <DataTestId value="value">
      <span {...props} />
    </DataTestId>
  );
};
```

**\<DetailsItem />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const DetailsItem = ({ name, ...props }) => {
  return (
    <DataTestId value={name}>
      <div {...props} />
    </DataTestId>
  );
};
```

**\<Details />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const Details = (props) => {
  return (
    <DataTestId value="details">
      <div {...props} />
    </DataTestId>
  );
};
```

**\<Page />**

```tsx
import React from "react";
import { DataTestIdRoot } from "react-data-test-id";

const ProfilePage = () => {
  return (
    <DataTestIdRoot value="profile">
      <div>
        <H3>Profile</H3>
        <Details>
          <DetailsItem name="name">
            <DetailsItemLabel>Name</DetailsItemLabel>
            <DetailsItemValue>John</DetailsItemValue>
          </DetailsItem>
          <DetailsItem name="email">
            <DetailsItemLabel>Email</DetailsItemLabel>
            <DetailsItemValue>john@example.com</DetailsItemValue>
          </DetailsItem>
        </Details>
      </div>
    </DataTestIdRoot>
  );
};
```

**Generated HTML:**

```html
<div data-testid="profile">
  <h3 data-testid="profile-title">Profile</h3>
  <div data-testid="profile-details">
    <div data-testid="profile-details-name">
      <label data-testid="profile-details-name-label">Name</label>
      <span data-testid="profile-details-name-value">John</span>
    </div>
    <div data-testid="profile-details-email">
      <label data-testid="profile-details-email-label">Email</label>
      <span data-testid="profile-details-email-value">john@example.com</span>
    </div>
  </div>
</div>
```

The scope can be reset at Details level when the parent scope hierarchy should not be included. Automation tools can still find the elements by using the parent IDs and then the children IDs.

**\<Details />**

```tsx
import React from "react";
import { DataTestIdRoot } from "react-data-test-id";

const Details = (props) => {
  return (
    <DataTestIdRoot value="details">
      <div {...props} />
    </DataTestIdRoot>
  );
};
```

**Generated HTML:**

```html
<div data-testid="profile">
  <h3 data-testid="profile-title">Profile</h3>
  <div data-testid="details">
    <div data-testid="details-name">
      <label data-testid="details-name-label">Name</label>
      <span data-testid="details-name-value">John</span>
    </div>
    <div data-testid="details-email">
      <label data-testid="details-email-label">Email</label>
      <span data-testid="details-email-value">john@example.com</span>
    </div>
  </div>
</div>
```

### Form

Core components like Input, Button, and Field apply `DataTestId` internally which get placed in the scope hierarchy.

**\<FormFieldLabel />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const FormFieldLabel = (props) => {
  return (
    <DataTestId value="label">
      <label {...props} />
    </DataTestId>
  );
};
```

**\<FormFieldInput />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const FormFieldInput = (props) => {
  return (
    <DataTestId value="input">
      <input {...props} />
    </DataTestId>
  );
};
```

**\<FormSubmitButton />**

```tsx
import React from "react";
import { DataTestId, DataTestIdScope } from "react-data-test-id";

const FormSubmitButton = ({ children, ...props }) => {
  return (
    <DataTestIdScope value="submit">
      <DataTestId value="button">
        <button type="submit" {...props}>
          {children ?? "Submit"}
        </button>
      </DataTestId>
    </DataTestIdScope>
  );
};
```

**\<FormCancelButton />**

```tsx
import React from "react";
import { DataTestId, DataTestIdScope } from "react-data-test-id";

const FormCancelButton = ({ children, ...props }) => {
  return (
    <DataTestIdScope value="cancel">
      <DataTestId value="button">
        <button type="button" {...props}>
          {children ?? "Cancel"}
        </button>
      </DataTestId>
    </DataTestIdScope>
  );
};
```

**\<FormField />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const FormField = ({ name, ...props }) => {
  return (
    <DataTestId value={name}>
      <div {...props} />
    </DataTestId>
  );
};
```

**\<FormTitle />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const FormTitle = (props) => {
  return (
    <DataTestId value="title">
      <h3 {...props} />
    </DataTestId>
  );
};
```

**\<Form />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const Form = (props) => {
  return (
    <DataTestId value="form">
      <form {...props} />
    </DataTestId>
  );
};
```

**\<Page />**

```tsx
import React from "react";
import { DataTestIdRootScope } from "react-data-test-id";

const EditProfilePage = () => {
  return (
    <DataTestIdRootScope value="edit-profile">
      <Form>
        <FormTitle>Edit Profile</FormTitle>
        <FormField name="name">
          <FormFieldLabel>Name</FormFieldLabel>
          <FormFieldInput type="text" />
        </FormField>
        <FormField name="email">
          <FormFieldLabel>Email</FormFieldLabel>
          <FormFieldInput type="text" />
        </FormField>
        <div>
          <FormSubmitButton />
          <FormCancelButton />
        </div>
      </Form>
    </DataTestIdRootScope>
  );
};
```

**Generated HTML:**

```html
<div data-testid="edit-profile">
  <form data-testid="edit-profile-form">
    <h3 data-testid="edit-profile-form-title">Edit Profile</h3>
    <div data-testid="edit-profile-form-name">
      <label data-testid="edit-profile-form-name-label">Name</label>
      <input data-testid="edit-profile-form-name-input" />
    </div>
    <div data-testid="edit-profile-form-email">
      <label data-testid="edit-profile-form-email-label">Email</label>
      <input data-testid="edit-profile-form-email-input" />
    </div>
    <div>
      <button data-testid="edit-profile-form-submit-button">Submit</button>
      <button data-testid="edit-profile-form-cancel-button">Submit</button>
    </div>
  </form>
</div>
```

The scope can be reset at Form level when the parent scope hierarchy should not be included. Automation tools can still find the elements by using the parent IDs and then the children IDs.

**\<Form />**

```tsx
import React from "react";
import { DataTestIdRoot } from "react-data-test-id";

const Form = (props) => {
  return (
    <DataTestIdRoot value="form">
      <form {...props} />
    </DataTestIdRoot>
  );
};
```

**Generated HTML:**

```html
<div data-testid="edit-profile">
  <form data-testid="form">
    <h3 data-testid="form-title">Edit Profile</h3>
    <div data-testid="form-name">
      <label data-testid="form-name-label">Name</label>
      <input data-testid="form-name-input" />
    </div>
    <div data-testid="form-email">
      <label data-testid="form-email-label">Email</label>
      <input data-testid="form-email-input" />
    </div>
    <div>
      <button data-testid="form-submit-button">Submit</button>
      <button data-testid="form-cancel-button">Submit</button>
    </div>
  </form>
</div>
```

## Configuration

Use `DataTestIdConfiguration` to override defaults:

```tsx
import React from "react";
import { DataTestIdConfiguration } from "react-data-test-id";

const App = () => {
  return (
    <DataTestIdConfiguration
      value={{
        enabled: true,
        dataAttributeName: "data-testid",
        scopeSeparator: "-",
        scopeTrasnformers: []
      }}
    >
      {/* app */}
    </DataTestIdConfiguration>
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

#### Production

Data test IDs may not be needed in production. Set `enabled` to `false` to disable data test IDs generation in the output.

```tsx
import React from "react";
import { DataTestIdConfiguration, DataTestIdRoot, DataTestId } from "react-data-test-id";

const App = () => {
  return (
    <DataTestIdConfiguration value={{ enabled: false }}>
      <DataTestIdRoot value="profile">
        <div>
          <DataTestId value="save">
            <button type="button">Save</button>
          </DataTestId>
        </div>
      </DataTestIdRoot>
    </DataTestIdConfiguration>
  );
};
```

**Generated HTML:**

```html
<div>
  <button type="button">Save</button>
</div>
```

## Transformers

Transformers are used to normalize or enforce conventions on scope hierarchy segments.

### Available transformers

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

#### Usage

```tsx
import React from "react";
import { DataTestIdConfiguration } from "react-data-test-id";

const App = () => {
  return (
    <DataTestIdConfiguration
      value={{
        scopeTrasnformers: [
          convertToLowerCase,
          replaceSpaceWith("-"),
          replaceWith(/[^a-z0-9-]/gi, "")
        ]
      }}
    >
      {/* app */}
    </DataTestIdConfiguration>
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

**Generated HTML:**

```html
<button data-testid="profile-save">Save</button>
```

### Custom transformers:

Custom transformers can be created for project needs and injected into the configuration.

```tsx
import React from "react";
import { DataTestIdConfiguration, DataTestIdRoot, DataTestId } from "react-data-test-id";

const kebabCase = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const App = () => {
  return (
    <DataTestIdConfiguration value={{ scopeTrasnformers: [kebabCase] }}>
      <DataTestIdRoot value="User Profile">
        <DataTestId value="Save Changes">
          <button type="button">Save</button>
        </DataTestId>
      </DataTestIdRoot>
    </DataTestIdConfiguration>
  );
};
```

**Generated HTML:**

```html
<button data-testid="user-profile-save-changes">Save</button>
```

## Components

### DataTestIdRoot

Starts/resets a root scope and applies the resulting ID to its child.

```tsx
<DataTestIdRoot value="page">
  <div>
    <DataTestIdRoot value="settings">
      <section>
        <DataTestId value="button">
          <button>Save</button>
        </DataTestId>
      </section>
    </DataTestIdRoot>
  </div>
</DataTestIdRoot>
```

**Generated HTML:**

```html
<div data-testid="page">
  <section data-testid="settings">
    <button data-testid="settings-button">Save</button>
  </section>
</div>
```

### DataTestIdRootScope

Resets the scope chain. Use this when a subtree should start a new scope.

```tsx
<DataTestIdRoot value="page">
  <DataTestIdRootScope value="modal">
    <DataTestId value="backdrop">
      <div />
    </DataTestId>
    <DataTestId value="content">
      <div>
        <DataTestId value="close">
          <button type="button">Close</button>
        </DataTestId>
      </div>
    </DataTestId>
  </DataTestIdRootScope>
</DataTestIdRoot>
```

**Generated HTML:**

```html
<div data-testid="modal-backdrop" />
<div data-testid="modal-content">
  <button data-testid="modal-content-close">Close</button>
</div>
```

### DataTestId

Appends a scope segment in the scope hierarchy and applies the resulting ID to its child.

```tsx
<DataTestIdRootScope value="page">
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
</DataTestIdRootScope>
```

**Generated HTML:**

```html
<div data-testid="page-toolbar">
  <button data-testid="page-toolbar-home">Home</button>
  <button data-testid="page-toolbar-refresh">Refresh</button>
</div>
```

### DataTestIdScope

Adds a scope segment in the hierarchy without applying an attribute, useful for layout boundaries.

```tsx
<DataTestIdRootScope value="page">
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
</DataTestIdRootScope>
```

**Generated HTML:**

```html
<div data-testid="page-filters">
  <select data-testid="page-filters-input-gender" />
  <select data-testid="page-filters-input-age" />
  <button data-testid="page-filters-actions-apply">Apply</button>
  <button data-testid="page-filters-actions-clear">Clear</button>
</div>
```

## Best practices

### Leaf scopes

Apply `DataTestId` inside core UI components (Button, Input, Label, Select) so every usage is automatically tagged. This removes the need to re-apply test IDs for each usage. This keeps the test IDs consistent and predictable across the application.

#### Example

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
const Toolbar = ({ children, ...props }) => {
  return (
    <DataTestIdRoot value="toolbar">
      <div {...props}>{children}</div>
    </DataTestIdRoot>
  );
};
```

```tsx
const PageSearchSection = () => {
  return (
    <Toolbar>
      <Input />
      <Button>Search</Button>
    </Toolbar>
  );
};
```

**Generated HTML:**

```html
<div data-testid="toolbar">
  <input data-testid="toolbar-input" />
  <button data-testid="toolbar-button">Search</button>
</div>
```

### Hierarchical scopes

Add IDs at multiple levels of the hierarchy; the scope chain keeps them unique without manual concatenation.
In the example below, the `<Details />` component uses scope `details`, and `<DetailsItem />` receives a dynamic scope via props. This keeps scope decisions at the component level and removes the need to manage hierarchy when generating test IDs.

#### Example

**\<DetailsItemLabel />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const DetailsItemLabel = (props) => {
  return (
    <DataTestId value="label">
      <label {...props} />
    </DataTestId>
  );
};
```

**\<DetailsItemValue />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const DetailsItemValue = (props) => {
  return (
    <DataTestId value="value">
      <span {...props} />
    </DataTestId>
  );
};
```

**\<DetailsItem />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const DetailsItem = ({ name, ...props }) => {
  return (
    <DataTestId value={name}>
      <div {...props} />
    </DataTestId>
  );
};
```

**\<Details />**

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

const Details = (props) => {
  return (
    <DataTestId value="details">
      <div {...props} />
    </DataTestId>
  );
};
```

**\<Page />**

```tsx
import React from "react";
import { DataTestIdRoot } from "react-data-test-id";

const ProfilePage = () => {
  return (
    <DataTestIdRoot value="profile">
      <div>
        <Details>
          <DetailsItem name="name">
            <DetailsItemLabel>Name</DetailsItemLabel>
            <DetailsItemValue>John</DetailsItemValue>
          </DetailsItem>
          <DetailsItem name="email">
            <DetailsItemLabel>Email</DetailsItemLabel>
            <DetailsItemValue>john@example.com</DetailsItemValue>
          </DetailsItem>
        </Details>
      </div>
    </DataTestIdRoot>
  );
};
```

**Generated HTML:**

```html
<div data-testid="profile">
  <div data-testid="profile-details">
    <div data-testid="profile-details-name">
      <label data-testid="profile-details-name-label">Name</label>
      <span data-testid="profile-details-name-value">John</span>
    </div>
    <div data-testid="profile-details-email">
      <label data-testid="profile-details-email-label">Email</label>
      <span data-testid="profile-details-email-value">john@example.com</span>
    </div>
  </div>
</div>
```

### Contextual scopes

Apply scopes based on usage context (not React context). For example, `<Input />` can use `input`, and a reusable `<SearchInput />` can add `search` and reuse `<Input />`. This adds `search` to the hierarchy and produces `search-input`.

#### Example

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
const SearchInput = (props) => {
  return (
    <DataTestIdScope value="search">
      <Input {...props} />
    </DataTestIdScope>
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
const Toolbar = ({ children, ...props }) => {
  return (
    <DataTestIdRoot value="toolbar">
      <div {...props}>{children}</div>
    </DataTestIdRoot>
  );
};
```

```tsx
const PageSearchSection = () => {
  return (
    <Toolbar>
      <SearchInput />
      <Button>Search</Button>
    </Toolbar>
  );
};
```

**Generated HTML:**

```html
<div data-testid="toolbar">
  <input data-testid="toolbar-search-input" />
  <button data-testid="toolbar-button">Search</button>
</div>
```

### Meaningful & short

Use meaningful, context‑based names like `profile`, `age`, `email`, `save`, or `filters`.

#### Example

```tsx
<DataTestIdRoot value="profile">
  <div>
    <DataTestId value="age">
      <input type="number" />
    </DataTestId>
    <DataTestId value="save">
      <button type="button">Save</button>
    </DataTestId>
  </div>
</DataTestIdRoot>
```

**Generated HTML:**

```html
<div data-testid="profile">
  <input data-testid="profile-age" />
  <button data-testid="profile-save">Save</button>
</div>
```

### Scope as path

Treat scope segments like a path: page → section → component → element.

#### Example

```tsx
<DataTestIdRoot value="dashboard">
  <DataTestId value="filters">
    <DataTestId value="date-range">
      <input type="text" />
    </DataTestId>
  </DataTestId>
</DataTestIdRoot>
```

**Generated HTML:**

```html
<input data-testid="dashboard-filters-date-range" />
```

### Avoid

Avoid over‑specific or visual names; prefer intent‑based names that survive layout changes.

#### Bad visual/layout-based names

```tsx
<DataTestIdRoot value="checkout">
  <DataTestId value="left-column">
    <DataTestId value="red-text">
      <span>$42.00</span>
    </DataTestId>
  </DataTestId>
</DataTestIdRoot>
```

**Generated HTML (Bad Test IDs):**

```html
<span data-testid="checkout-left-column-red-text">$42.00</span>
```

#### Good intent-based names

```tsx
<DataTestIdRoot value="checkout">
  <DataTestId value="summary">
    <DataTestId value="total">
      <span>$42.00</span>
    </DataTestId>
  </DataTestId>
</DataTestIdRoot>
```

**Generated HTML (Good Test Ids):**

```html
<span data-testid="checkout-summary-total">$42.00</span>
```

## Internal building blocks

The internal building blocks, components, and hooks are mostly used internally, but they are available to read the current configuration or scope and apply them in customized components.

### Components

#### DataTestIdAttribute

`DataTestIdAttribute` is usually used internally by `DataTestIdRoot` and `DataTestId`. Direct usage is only needed when applying the current scope to a single child element by hand.

Applies the current scope to a single child element. Useful when a component already has a scope from its parent but needs to set the attribute explicitly.

```tsx
<DataTestIdScope value="search">
  <DataTestIdAttribute>
    <input type="text" />
  </DataTestIdAttribute>
</DataTestIdScope>
```

**Generated HTML:**

```html
<input type="text" data-testid="search" />
```

### Hooks

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
