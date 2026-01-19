# react-data-test-id

A context-based utility for composing predictable & unique test IDs in React apps.

## Why `data-test-ids` exist?

Data attributes such as `data-testid` are especially valuable for automation testing: they provide selectors that are stable across UI refactors, avoid brittle DOM traversal, and keep tests focused on user-visible intent rather than layout structure.

In modern UI codebases, DOM structure changes frequently as components are refactored, styled differently, or re-ordered for layout. Test selectors that depend on class names or nested DOM structure often break even when the user experience remains the same.

`data-testid` attributes give you a deliberate, semantic hook for automation tooling (like React Testing Library, Playwright, or Cypress) that is isolated from styling and layout changes. Teams can standardize these identifiers to improve test readability, speed up troubleshooting, and reduce flaky tests.

Test IDs are most useful when they are consistent and uniquely scoped to where a component appears in the UI. This library uses React context to build a hierarchical identifier without forcing every component to manually concatenate strings.

## What the context-based approach solves?

- Eliminates hard-coded, scattered test IDs.
- Avoids collisions when the same component appears in different parts of the page.
- Keeps IDs stable as components move within the same scoped context.

## Context-based approach

`DataTestIdRoot` establishes a root scope. Each `DataTestId` appends a segment and applies the resulting value to its child element. This approach makes IDs:

- **Unique per context**: nested components inherit the scope and add their own segment.
- **Composable**: teams can add scope at layout boundaries without changing leaf components.
- **Stable**: refactors only affect IDs where structure meaningfully changes.
- **Effortless uniqueness**: you do not need to manage global uniqueness because the scope hierarchy ensures each ID is unique in its context.
- **Local responsibility**: each component only defines its own `value` segment, and the scope is composed automatically as components nest.

## How it works

This workflow shows how `DataTestIdRoot` and `DataTestId` create a scoped identifier. Each step is deterministic so the resulting ID is stable across refactors.

1. **Root establishes the scope**: `DataTestIdRoot` normalizes its `value` and writes the root data attribute on its child. The normalized value is stored in `DataTestIdScope`.
2. **Child reads and extends the scope**: `DataTestId` reads `DataTestIdScope`, normalizes its own `value`, and appends it using the configured `pathSeparator`.
3. **Attribute is applied**: The composed identifier is written to the child using `dataAttributeName`.
4. **Nested components continue**: Each nested `DataTestId` repeats the same process, producing a stable chain like `page-section-button`.

Illustration:

The scope hierarchy eventually generates and applies the scoped value to each child.

```
DataTestIdRoot("page")        => "page"               => <div data-testid="page">...
  └─ DataTestId("header")     => "page-header"        => <div data-testid="page-header">...
       └─ DataTestId("title") => "page-header-title"  => <h1 data-testid="page-header-title">...
```

## Installation

```sh
npm install --save react-data-test-id
```

```sh
yarn add react-data-test-id
```

## Basic usage

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

export function Checkout() {
  return (
    <DataTestIdRoot value="checkout">
      <section>
        <DataTestId value="summary">
          <h3>Summary</h3>
        </DataTestId>
      </section>
    </DataTestIdRoot>
  );
}
```

Generated HTML:

```html
<section data-testid="checkout">
  <h3 data-testid="checkout-summary">Summary</h3>
</section>
```

## Configuration

### Configuration options

| Option              | Type                              | Default         | Description                            |
| ------------------- | --------------------------------- | --------------- | -------------------------------------- |
| `dataAttributeName` | string                            | `"data-testid"` | Attribute written to elements.         |
| `enabled`           | boolean                           | `true`          | Turn output on/off.                    |
| `pathSeparator`     | string                            | `"-"`           | Character used between scope segments. |
| `spaceReplacement`  | string \| undefined               | `"-"`           | Replacement for whitespace characters. |
| `caseTransform`     | `"lower" \| "upper" \| undefined` | `"lower"`       | Optional case conversion.              |

### `dataAttributeName`

```tsx
<DataTestIdConfiguration.Provider
  value={{
    enabled: true,
    pathSeparator: "-",
    dataAttributeName: "data-x-path",
    spaceReplacement: "-",
    caseTransform: "lower"
  }}
>
  <DataTestId value="cta">
    <button type="button">Buy</button>
  </DataTestId>
</DataTestIdConfiguration.Provider>
```

Generated HTML:

```html
<button type="button" data-x-path="cta">Buy</button>
```

### `enabled`

```tsx
<DataTestIdConfiguration.Provider
  value={{
    enabled: false,
    pathSeparator: "-",
    dataAttributeName: "data-testid",
    spaceReplacement: "-",
    caseTransform: "lower"
  }}
>
  <DataTestId value="panel">
    <div>Panel</div>
  </DataTestId>
</DataTestIdConfiguration.Provider>
```

Generated HTML:

```html
<div>Panel</div>
```

### `pathSeparator`

```tsx
<DataTestIdConfiguration.Provider
  value={{
    enabled: true,
    pathSeparator: ":",
    dataAttributeName: "data-testid",
    spaceReplacement: "-",
    caseTransform: "lower"
  }}
>
  <DataTestIdRoot value="settings">
    <DataTestId value="panel">
      <div>Panel</div>
    </DataTestId>
  </DataTestIdRoot>
</DataTestIdConfiguration.Provider>
```

Generated HTML:

```html
<div data-testid="settings:panel">Panel</div>
```

### `spaceReplacement`

```tsx
<DataTestIdConfiguration.Provider
  value={{
    enabled: true,
    pathSeparator: "-",
    dataAttributeName: "data-testid",
    spaceReplacement: "_",
    caseTransform: "lower"
  }}
>
  <DataTestId value="profile card">
    <div>Profile</div>
  </DataTestId>
</DataTestIdConfiguration.Provider>
```

Generated HTML:

```html
<div data-testid="profile_card">Profile</div>
```

### `caseTransform`

```tsx
<DataTestIdConfiguration.Provider
  value={{
    enabled: true,
    pathSeparator: "-",
    dataAttributeName: "data-testid",
    spaceReplacement: "-",
    caseTransform: "upper"
  }}
>
  <DataTestId value="profile card">
    <div>Profile</div>
  </DataTestId>
</DataTestIdConfiguration.Provider>
```

Generated HTML:

```html
<div data-testid="PROFILE-CARD">Profile</div>
```

## Usage patterns

### Page scope

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

export function OrdersPage() {
  return (
    <DataTestIdRoot value="orders">
      <section>
        <DataTestId value="table">
          <div>
            <DataTestId value="row">
              <span>Row</span>
            </DataTestId>
          </div>
        </DataTestId>
      </section>
    </DataTestIdRoot>
  );
}
```

Generated HTML:

```html
<span data-testid="orders-table-row">Row</span>
```

### Component scope

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

export function UserCard({ name }: { name: string }) {
  return (
    <DataTestIdRoot value="user-card">
      <DataTestId value="header">
        <div>
          <DataTestId value="name">
            <span>{name}</span>
          </DataTestId>
        </div>
      </DataTestId>
    </DataTestIdRoot>
  );
}
```

Generated HTML:

```html
<span data-testid="user-card-header-name">Alice</span>
```

### Resetting the scope/hierarchy

Use multiple `DataTestIdRoot` components to intentionally reset the scope in a hierarchy. Each root starts a new chain, so descendants do not inherit the previous scope.

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

export function Dashboard() {
  return (
    <DataTestIdRoot value="dashboard">
      <section>
        <DataTestId value="header">
          <h2>Dashboard</h2>
        </DataTestId>
        <DataTestIdRoot value="settings">
          <DataTestId value="panel">
            <div>Settings Panel</div>
          </DataTestId>
        </DataTestIdRoot>
      </section>
    </DataTestIdRoot>
  );
}
```

Generated HTML:

```html
<section data-testid="dashboard">
  <h2 data-testid="dashboard-header">Dashboard</h2>
  <div data-testid="settings-panel">Settings Panel</div>
</section>
```

## Best practices

### Apply at core components

Attach `DataTestId` at foundational UI primitives like buttons, labels, inputs, dropdowns, and list items so IDs are consistent across the app.

Example:

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

export function Button({ label, variant }: { label: string; variant?: "default" | "primary" }) {
  return (
    <DataTestId value="button">
      <DataTestId value={variant}>
        <button type="button">{label}</button>
      </DataTestId>
    </DataTestId>
  );
}
```

Generated HTML:

```html
<button type="button" data-testid="button-default">Save</button>
```

```html
<button type="button" data-testid="button-primary">Save</button>
```

### Apply at leaf components/nodes

Apply the ID at the actual leaf node that the user interacts with (e.g., the label element, the clickable icon, or the dropdown trigger).

Example:

```tsx
import React from "react";
import { DataTestId } from "react-data-test-id";

export function Form({ children }: { children: React.ReactNode }) {
  return <DataTestId value="form">{children}</DataTestId>;
}

export function FormField({ children }: { children: React.ReactNode }) {
  return <DataTestId value="field">{children}</DataTestId>;
}

export function FormFieldLabel({ text }: { text: string }) {
  return (
    <DataTestId value="label">
      <label>{text}</label>
    </DataTestId>
  );
}
```

Generated HTML:

```html
<label data-testid="form-field-label">Email</label>
```

### Keep scopes meaningful & short

Scope at layout boundaries or pages or components using the root scope (`DataTestIdRoot`) to avoid excessively long IDs.

## Use page root scopes

Define scopes per page so components inside each page generate unique data test IDs based on that page's scope hierarchy. Even if components reuse the same IDs across pages, the page scope keeps them unique.

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

export function BillingPage() {
  return (
    <DataTestIdRoot value="billing">
      <DataTestId value="summary">
        <div>
          <DataTestId value="total">
            <span>Total</span>
          </DataTestId>
        </div>
      </DataTestId>
    </DataTestIdRoot>
  );
}
```

Generated HTML:

```html
<span data-testid="billing-summary-total">Total</span>
```

## Use component root scopes

Define the root scope at components with their own significance. Automation scripts can locate them by first finding the parent data test ID and then the scoped IDs inside it.

```tsx
import React from "react";
import { DataTestId, DataTestIdRoot } from "react-data-test-id";

export function PriceTag({ amount }: { amount: string }) {
  return (
    <DataTestIdRoot value="price-tag">
      <DataTestId value="value">
        <span>
          <DataTestId value="label">
            <strong>Amount:</strong>
          </DataTestId>
          <DataTestId value="amount">
            <strong>{amount}</strong>
          </DataTestId>
        </span>
      </DataTestId>
    </DataTestIdRoot>
  );
}
```

Generated HTML:

```html
<span data-testid="price-tag-value">
  <span data-testid="price-tag-value-label">Amount</span>
  <span data-testid="price-tag-value-amount">$24</span>
</span>
```

## Testing tips

- Prefer `getByTestId`/`findByTestId` queries when the semantic role is not reliable.
- Avoid over-scoping: keep IDs short and meaningful.
- Use `DataTestIdRoot` to separate similar lists or panels that render the same components.

## FAQ

**Do I have to make IDs globally unique?**  
No. The context scope makes IDs unique within their UI position.

**What if a component renders multiple elements?**  
Wrap only the specific element you want to target with `DataTestId`.

**Can I disable IDs in production?**  
Yes. Set `enabled: false` in `DataTestIdConfiguration`.

## License

MIT
