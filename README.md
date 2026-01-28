# react-data-test-id

![npm](https://img.shields.io/npm/v/react-data-test-id?logo=npm) ![tests](https://img.shields.io/badge/tests-passing-brightgreen?logo=vitest) ![typecheck](https://img.shields.io/badge/typecheck-passing-brightgreen?logo=typescript) ![license](https://img.shields.io/npm/l/react-data-test-id?logo=open-source-initiative)

A context-based utility for composing predictable, readable, and unique `data-testid` values in React apps for test automation.

## Why `data-test-ids` exist

Data attributes such as `data-testid` provide stable selectors for automation testing. They are resilient to DOM structure changes, avoid brittle class name or layout selectors, and keep tests focused on user‑visible intent. As UI codebases evolve, markup and styling can change without altering behavior. Test ID attributes give teams a durable contract for automation tooling like Playwright and Cypress.

Test IDs are a key layer in automation because they decouple tests from visual structure and styling. They communicate intent directly, making selectors readable and predictable across refactors. This reduces maintenance cost as components change or move within the UI.

Test IDs are most effective when they are consistent and scoped to the part of the UI where a component lives. This library uses React context to build that scope automatically so each component declares only its own segment instead of manually concatenating strings.

## Issues of data-test-ids

Manual test IDs work for small screens, but they break down as component trees grow. The examples below show how quickly IDs become verbose and tightly tied to structure, even in simple details and form views.

**Example of manual IDs for data display:**

```tsx
const DetailsItemLabel = (props) => {
  return <label {...props} />;
};

const DetailsItemValue = (props) => {
  return <span {...props} />;
};

<Details>
  <DetailsItemLabel data-testid="profile-details-name-label">Name</DetailsItemLabel>
  <DetailsItemValue data-testid="profile-details-name-value">John</DetailsItemValue>
  <DetailsItemLabel data-testid="profile-details-email-label">Email</DetailsItemLabel>
  <DetailsItemValue data-testid="profile-details-email-value">john@example.com</DetailsItemValue>
</Details>;
```

**Example of manual IDs for a form:**

```tsx
const FormFieldLabel = (props) => {
  return <label {...props} />;
};

const FormFieldInput = (props) => {
  return <input {...props} />;
};

const Button = (props) => {
  return <button type="button" {...props} />;
};

<Form>
  <FormField>
    <FormFieldLabel data-testid="profile-form-email-label">Email</FormFieldLabel>
    <FormFieldInput data-testid="profile-form-email-input" type="text" />
  </FormField>
  <Button data-testid="profile-form-save-button">Save</Button>
</Form>;
```

In both examples, the IDs encode the full path (`profile-details-name-label`, `profile-form-email-input`). This creates a set of recurring pain points:

- Uniqueness: the same `DetailsItemLabel` or `FormFieldInput` used in another section needs a different prefix to stay unique.
- Collisions: identical manual prefixes across sections make selectors ambiguous or point to the wrong element.
- Maintainability: long strings grow with every new layer and become difficult to audit.
- Reusability: reusable components carry page‑specific IDs, so each usage needs a manual rewrite.
- Tight coupling: selectors mirror layout and hierarchy, so structural changes ripple through tests.
- Inconsistency: different teams form different naming patterns for similar UI, creating drift.
- Non‑meaningful values: manual names reflect structure more than intent, making selectors harder to read.
- Developer experience: debugging failed selectors becomes slower as ID complexity grows.
- More: renaming a parent segment can break unrelated tests that depend on the same prefix.

These issues make test suites fragile and increase ongoing maintenance cost. Small UI changes in development can break test suites in production.

A context based approach addresses these problems by composing IDs from scope segments, and it is covered in the next section.

## Context-based approach

`DataTestIdRoot` establishes a root scope. Each `DataTestId` adds one segment to the hierarchy and applies the joined scope to its child element.

**Context-based example for data display:**

```tsx
const DetailsItemLabel = (props) => {
  return (
    <DataTestId value="label">
      <label {...props} />
    </DataTestId>
  );
};

const DetailsItemValue = (props) => {
  return (
    <DataTestId value="value">
      <span {...props} />
    </DataTestId>
  );
};

<DataTestIdRoot value="profile">
  <Details>
    <DataTestId value="name">
      <DetailsItemLabel>Name</DetailsItemLabel>
    </DataTestId>
    <DataTestId value="name">
      <DetailsItemValue>John</DetailsItemValue>
    </DataTestId>
    <DataTestId value="email">
      <DetailsItemLabel>Email</DetailsItemLabel>
    </DataTestId>
    <DataTestId value="email">
      <DetailsItemValue>john@example.com</DetailsItemValue>
    </DataTestId>
  </Details>
</DataTestIdRoot>;
```

**Generated HTML:**

```html
<div data-testid="profile-details">
  <label data-testid="profile-details-name-label">Name</label>
  <span data-testid="profile-details-name-value">John</span>
  <label data-testid="profile-details-email-label">Email</label>
  <span data-testid="profile-details-email-value">john@example.com</span>
</div>
```

**Context-based example for a form:**

```tsx
const FormFieldLabel = (props) => {
  return (
    <DataTestId value="label">
      <label {...props} />
    </DataTestId>
  );
};

const FormFieldInput = (props) => {
  return (
    <DataTestId value="input">
      <input {...props} />
    </DataTestId>
  );
};

const FormSubmitButton = (props) => {
  return (
    <DataTestId value="submit">
      <button type="button" {...props} />
    </DataTestId>
  );
};

<DataTestIdRoot value="profile">
  <Form>
    <DataTestIdScope value="form">
      <DataTestId value="email">
        <FormFieldLabel>Email</FormFieldLabel>
      </DataTestId>
      <DataTestId value="email">
        <FormFieldInput type="text" />
      </DataTestId>
      <DataTestId value="save">
        <FormSubmitButton>Save</FormSubmitButton>
      </DataTestId>
    </DataTestIdScope>
  </Form>
</DataTestIdRoot>;
```

**Generated HTML:**

```html
<form data-testid="profile-form">
  <label data-testid="profile-form-email-label">Email</label>
  <input data-testid="profile-form-email-input" />
  <button data-testid="profile-form-save">Save</button>
</form>
```

How this approach resolves the earlier issues:

- Uniqueness and collisions: each element receives the full scope path, so repeated components stay unique across branches and lists.
- Maintainability: IDs are composed from short, readable segments instead of long manual strings.
- Reusability: leaf components own their segment and do not need parent‑specific IDs.
- Tight coupling: selectors express intent rather than reflecting the DOM structure or layout.
- Inconsistency: shared configuration and naming patterns enforce consistent segments.
- Non‑meaningful values: segments represent domain intent (`profile`, `details`, `email`).
- Developer experience: less manual wiring, fewer breakages, and easier refactors.

More detailed explanations appear in `In a nutshell`, `What is scope`, and `How scope generates test IDs`.

## In a nutshell

A quick overview of how the scope chain becomes a test ID:

1. `DataTestIdRoot` starts a scope at a page, feature, or component boundary.
2. `DataTestId` adds one segment to its current hierarchy and applies the joined scope to its child.
3. Each nested `DataTestId` extends the scope so each element gets a composed, hierarchical, and unique ID.

```
App
└─ DataTestIdRoot(value="app")
   └─ DataTestId(value="settings")
      └─ DataTestId(value="profile")
         └─ DataTestId(value="save")
```

Resulting hierarchical IDs:

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

## Installation

#### NPM

```bash
npm install --save react-data-test-id
```

#### Yarn

```bash
yarn add react-data-test-id
```

## What is scope?

A scope is the current path of segments in the component hierarchy. Each segment is a meaningful label like `page`, `section`, or `button`. A scope captures the real‑world context of a component in the UI, not the React context API.

Scope values act like a path: the root segment establishes the top‑level context, and each nested segment refines that context. The scope is not an ID by itself. The `data-testid` is the joined scope path at that hierarchy level. It's covered in detail under section `Test IDs generation through scope hierarchy`.

For clarity and stability, scope values should represent intent rather than layout or styling. Intent‑based naming keeps test IDs predictable as the UI evolves. The `Best practices` section contains naming guidance and examples.

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

## How scope generates test IDs

Scope hierarchy is built from the values passed at each hierarchy level. Specifically, the values passed to each `DataTestIdRoot` or `DataTestIdRootScope`, `DataTestIdScope`, and `DataTestId` in the component hierarchy. Each segment is appended in the same hierarchical order, and the final `data-testid` is the joined path at every scope level in the hierarchy.

`DataTestIdRoot` or `DataTestIdRootScope` is useful for deliberate boundaries. It resets the scope chain for a subtree while keeping the same configuration. This makes it possible to keep IDs meaningful inside an isolated section without inheriting the outer path.

Each scope level represents the full path from the root to that node, not just the last segment. This is the key rule that keeps IDs stable and prevents collisions when the same component appears in different parts of the UI.

Core rules for generation:

- `DataTestIdRoot` or `DataTestIdRootScope` starts the scope and can reset it for a subtree.
- `DataTestIdScope` extends the scope without applying an attribute.
- `DataTestId` extends the scope and applies the attribute to its child.
- Empty or undefined segments are ignored when building the path.
- `scopeSeparator` and `scopeTransformers` are applied globally before the attribute is set, so values remain consistent across the application.
  Each component and method is covered in its respective section, such as `Transformers` and `Components`, later in the documentation.

Practical interpretation:

- A change in a higher‑level scope segment updates all child IDs under that branch.
- A change in a branch or leaf scope segment affects only that element and its descendants.
- Reusing the same component in different scopes produces unique IDs with the same local naming.
- The same branch or leaf name can appear in multiple branches without collisions because the full path differs.

### Flow chart

```
------------------------------------------------------------------------------------
Component and scope hierarchy                 Generated test IDs
------------------------------------------------------------------------------------
DataTestIdRoot("app")                         → "app"
├─ DataTestId("profile")                      → "app-profile"
│  └─ DataTestId("details")                   → "app-profile-details"
│     ├─ DataTestId("name")                   → "app-profile-details-name"
│     │  ├─ DataTestId("label")               → "app-profile-details-name-label"
│     │  └─ DataTestId("value")               → "app-profile-details-name-value"
│     └─ DataTestId("email")                  → "app-profile-details-email"
│        ├─ DataTestId("label")               → "app-profile-details-email-label"
│        └─ DataTestId("value")               → "app-profile-details-email-value"
└─ DataTestId("settings")                     → "app-settings"
   └─ DataTestId("details")                   → "app-settings-details"
      ├─ DataTestId("language")               → "app-settings-details-language"
      │  ├─ DataTestId("label")               → "app-settings-details-language-label"
      │  └─ DataTestId("value")               → "app-settings-details-language-value"
      └─ DataTestId("theme")                  → "app-settings-details-theme"
         ├─ DataTestId("label")               → "app-settings-details-theme-label"
         └─ DataTestId("value")               → "app-settings-details-theme-value"
------------------------------------------------------------------------------------
DataTestIdRoot("app")                         → "app"
├─ DataTestId("profile")                      → "app-profile"
│  └─ DataTestId("form")                      → "app-profile-form"
│     ├─ DataTestId("name")                   → "app-profile-form-name"
│     │  ├─ DataTestId("input")               → "app-profile-form-name-input"
│     │  └─ DataTestId("help")                → "app-profile-form-name-help"
│     ├─ DataTestId("email")                  → "app-profile-form-email"
│     │  ├─ DataTestId("input")               → "app-profile-form-email-input"
│     │  └─ DataTestId("help")                → "app-profile-form-email-help"
│     ├─ DataTestId("save")                   → "app-profile-form-save"
│     └─ DataTestId("cancel")                 → "app-profile-form-cancel"
└─ DataTestId("settings")                     → "app-settings"
   └─ DataTestId("form")                      → "app-settings-form"
      ├─ DataTestId("language")               → "app-settings-form-language"
      │  ├─ DataTestId("input")               → "app-settings-form-language-input"
      │  └─ DataTestId("help")                → "app-settings-form-language-help"
      ├─ DataTestId("theme")                  → "app-settings-form-theme"
      │  ├─ DataTestId("input")               → "app-settings-form-theme-input"
      │  └─ DataTestId("help")                → "app-settings-form-theme-help"
      ├─ DataTestId("save")                   → "app-settings-form-save"
      ├─ DataTestId("cancel")                 → "app-settings-form-cancel"
      └─ DataTestId("reset")                  → "app-settings-form-reset"
```

Same components used in different hierarchies generate predictable, unique test IDs:

```
- Details under "profile"  → "app-profile-details"
- Details under "settings" → "app-settings-details"

- Label under "profile -> name"  → "app-profile-details-name-label"
- Value under "settings -> name" → "app-settings-details-name-value"

- Label under "profile -> email"  → "app-profile-details-email-label"
- Value under "settings -> email" → "app-settings-details-email-value"
```

```
- Form under "profile"  → "app-profile-form"
- Form under "settings" → "app-settings-form"

- SaveButton under "profile"  → "app-profile-form-save"
- SaveButton under "settings" → "app-settings-form-save"

- CancelButton under "profile"  → "app-profile-form-cancel"
- CancelButton under "settings" → "app-settings-form-cancel"
```

## Usage

This section demonstrates two representative UI flows: a data‑driven page and a form. The goal is to show how scope is built across hierarchy levels, how parent components define context, and how leaf components contribute their own segments without needing to know the full path.

The examples are structured around three recurring patterns:

- A root boundary sets the page or feature scope.
- Mid‑level components add grouping segments for layout or sections.
- Leaf components apply their own segment and render the final `data-testid`.

Usage guidance:

- Start with `DataTestIdRoot` or `DataTestIdRootScope` at a page, feature, or module boundary.
- Use `DataTestId` inside reusable components so branch and leaf elements define their own segments.
- Use `DataTestIdScope` to create a layout or grouping boundary without applying an attribute.
- Reset the scope with `DataTestIdRoot` or `DataTestIdRootScope` when a subtree should be isolated.
- Keep segment names intent‑based; the `Best practices` section provides naming guidance.

### Page

This example focuses on a read‑only details page. The page creates a root scope (`profile`), and each nested component adds its own segment. The leaf components (`label` and `value`) apply the attribute, while intermediate components shape the hierarchy.

Scope breakdown for this example:

- Page root: `profile`
- Section: `details`
- Row key: `name` or `email`
- Leaf roles: `label` and `value`

Core components like Label, Value, and Item apply `DataTestId` internally for their own scope. Parent components add their own `DataTestId` for the surrounding hierarchy.

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

#### Resetting scope on purpose

The scope can be reset at the Details level when the parent scope hierarchy should not be included. Automation tools can still find elements by combining parent IDs with child IDs.

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

This example shows a form with fields and actions. The form sits under a root scope (`edit-profile`) and uses nested scopes for fields and actions. Field components and buttons apply their own segments, while the form and field components create the structural context.

Scope breakdown for this example:

- Page root: `edit-profile`
- Form: `form`
- Field key: `name` or `email`
- Field roles: `label` and `input`
- Actions: `submit` and `cancel` grouped under their own scopes

Core components like Input, Button, and Field apply `DataTestId` internally for their own scope. Parent components add their own `DataTestId` for the surrounding hierarchy.

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
      <button data-testid="edit-profile-form-cancel-button">Cancel</button>
    </div>
  </form>
</div>
```

#### Resetting scope on purpose

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
      <button data-testid="form-cancel-button">Cancel</button>
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
        scopeTransformers: []
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
| `scopeTransformers` | `Array<(value: string) => string>` | `[]`            | Transformers applied to each segment before joining. | `{ scopeTransformers: [value => value.toUpperCase()] }` |

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

Transformers normalize or enforce conventions on scope hierarchy segments. Each transformer runs on every scope segment before the segments are joined. This means the scope path is built from transformed values, not the original inputs, which keeps IDs consistent across the hierarchy.

Key points:

- Transformers apply to each segment, not to the final joined ID.
- Order matters: the output of one transformer becomes the input to the next.
- Empty results are still treated as segments; if a transformer removes content completely, that segment may be ignored during joining.
- The same transformer list applies to all scopes within the configuration boundary.

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
        scopeTransformers: [
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
    <DataTestIdConfiguration value={{ scopeTransformers: [kebabCase] }}>
      <DataTestIdRoot value="User Profile">
        <div>
          <DataTestId value="Save Changes">
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
<div data-testid="user-profile">
  <button data-testid="user-profile-save-changes">Save</button>
</div>
```

## Components

### DataTestIdRoot

Starts or resets the root scope in the hierarchy and applies the scope as a data test ID attribute to its child. This component defines the top‑level boundary for a page, feature, or isolated subtree.

Common usage:

- Place at the outermost element of a page or feature.
- Use to deliberately reset scope for an isolated subtree.
- Use for coarse, human‑readable scope segments such as `profile`, `settings`, or `checkout`.

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

Resets the scope chain without applying a data test ID. Use this when a subtree should start a new scope while keeping the same configuration.

Common usage:

- Wrap modals, drawers, or overlays that should not inherit parent scope.
- Create isolated scope boundaries for reusable widgets embedded in different pages.

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

Sets the scope segment in the hierarchy and applies the resulting data test ID to its child. This is the primary building block for leaf elements and reusable components.

Common usage:

- Wrap a UI element so it contributes a stable segment to the hierarchy.
- Place inside reusable components so each component defines its own segment.

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

Adds a scope segment in the hierarchy without applying an attribute. This is useful for layout boundaries, grouping, or sections where no DOM element should receive a data test ID.

Common usage:

- Group controls within a toolbar or filter panel.
- Add a semantic boundary for a list, card group, or action set.

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

These practices keep scope values consistent, make test IDs predictable, and reduce churn as components evolve. Each subsection highlights a common design pattern that scales across larger component trees.

### Branch and leaf scopes

Apply `DataTestId` inside core UI components (Button, Input, Label, Select) so every usage is automatically tagged. This removes the need to re‑apply test IDs for each usage and keeps IDs consistent across the application.

This pattern keeps leaf responsibilities local: each leaf component defines its own segment and does not depend on parent context details.

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

This approach works well for content‑driven pages where sections and rows are built from reusable components.

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

Contextual scopes help express intent at the point of composition while keeping leaf components generic.

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

### Boundary scopes

Apply scope boundaries where the scope needs to be reset on purpose. Examples include independent page sections such as reports, feeds, or comment areas.

In the example below, the page has sections for totals, categories, locations, and geography. Each section can reuse the same components and set its own scope without applying an attribute.

Boundary scopes are most useful when reusing the same module across different screens and avoiding long inherited paths.

```tsx
const SalesTotals = () => {
  return (
    <DataTestIdScope value="totals">
      <NumericalSummaryCards data={data} />
    </DataTestIdScope>
  );
};
```

```tsx
const SalesByCategory = () => {
  return (
    <DataTestIdScope value="by-category">
      <NumericalSummaryCards data={data} />
    </DataTestIdScope>
  );
};
```

```tsx
const SalesByLocation = () => {
  return (
    <DataTestIdScope value="by-location">
      <NumericalSummaryCards data={data} />
    </DataTestIdScope>
  );
};
```

```tsx
const SalesByGeography = () => {
  return (
    <DataTestIdScope value="by-geography">
      <NumericalSummaryCards data={data} />
    </DataTestIdScope>
  );
};
```

```tsx
const Page = () => {
  return (
    <div>
      <DataTestIdScope value="sales">
        <SalesByCategory />
        <SalesByLocation />
        <SalesByGeography />
      </DataTestIdScope>

      <DataTestIdScope value="leads">{/* leads related UI */}</DataTestIdScope>
    </div>
  );
};
```

### Configuration conventions

Use configuration to keep naming rules consistent across the application. For example, transformers can normalize casing and spacing, and the scope separator can reflect team conventions.

Centralizing conventions prevents drift between teams and keeps test IDs stable across features.

### Short but meaningful

Use meaningful, context‑based names like `profile`, `age`, `email`, `save`, or `filters`.

Short names reduce noise in the final ID while still capturing intent. Prefer domain language over structural or visual terms.

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

This mental model helps choose the right scope depth and makes it easier to reason about where an ID belongs in the hierarchy.

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

**Generated HTML (Good Test IDs):**

```html
<span data-testid="checkout-summary-total">$42.00</span>
```

## Internal building blocks

The internal building blocks, components, and hooks are mostly used internally, but they are available to read current configuration or scope and apply them in custom components.

### Components

#### DataTestIdAttribute

`DataTestIdAttribute` is usually used internally by `DataTestIdRoot` and `DataTestId`. Direct usage is only needed when applying the current scope to a single child element manually.

Applies the current scope value as a data test ID attribute, if `enabled` in the configuration. The value is read from the active scope in the hierarchy.

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

#### DataTestIdSwitch

`DataTestIdSwitch` selects either the `On` or `Off` branch from its immediate children based on the `enabled` flag in configuration. Both `DataTestIdSwitch.On` and `DataTestIdSwitch.Off` must be immediate children.

```tsx
import React from "react";
import { DataTestIdConfiguration, DataTestIdSwitch } from "react-data-test-id";

const ExampleComponent = () => {
  return (
    <DataTestIdConfiguration value={{ enabled: true }}>
      <DataTestIdSwitch>
        <DataTestIdSwitch.On>
          <div>Enabled</div>
        </DataTestIdSwitch.On>
        <DataTestIdSwitch.Off>
          <div>Disabled</div>
        </DataTestIdSwitch.Off>
      </DataTestIdSwitch>
    </DataTestIdConfiguration>
  );
};
```

**Generated HTML:**

```html
<div>Enabled</div>
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
