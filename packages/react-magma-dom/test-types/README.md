Run after building the library:

```sh
npm run build --workspace react-magma-dom
npm run test:types --workspace react-magma-dom
```

The consumer fixture imports generated public declarations from `../dist` with
TypeScript `strict` enabled, including `noImplicitAny`, `strictNullChecks` and
`strictFunctionTypes`. Rebuild before checking source changes so stale declarations
do not hide regressions. The frozen test-only declarations in `downshift-v5.d.ts`
are the relevant interfaces from published Downshift 5.4.7. Keep them unchanged
when updating the adapter, so explicitly typed existing consumers stay covered.

The explicit consumer matrix covers `Select` and `Combobox`, each in single and
multiple selection modes, with strings and custom `{ id, text }` objects. JSX
callbacks receive contextual types from inferred items without explicit generic
arguments. Positive assignments and `@ts-expect-error` guards cover:

- Legacy reducer `action.props` presence and inferred item fields for all four
  component/mode combinations; modern single-selection reducer props and nullable
  state.
- Single-selection null values, nullable change callbacks, multiple-selection
  change/removal callbacks and Combobox input item-update callbacks.
- Object and callback refs across each component/mode's public ref slots, with
  mismatched textarea refs rejected.
- Keyboard/focus event inference, custom renderer item inference, declared
  `ItemRenderOptions` field types and list-item refs.
- Invalid item shapes, callbacks and navigation modes from the original fixture.

These are declared public ref contracts: `Select.innerRef` accepts button refs,
`Combobox.innerRef` input refs, and `Combobox.toggleButtonRef` button refs, in both
selection modes. The Select trigger currently renders a div; its legacy public
button-ref declaration is retained for compatibility. These compiler checks do
not establish the runtime element type or test every possible structural DOM-ref
assignment.

Custom renderer extension properties remain supported. Negative checks target
known declared fields; they do not tighten the existing extension index, remove
legacy aliases, or rely on whether arbitrary properties use `any`. This matrix
covers the listed combinations rather than every possible prop interaction.

`downshift-getters.tsx` also imports emitted declarations for the internal
ComboboxInput, ItemsList, SelectContainer and SelectTriggerButton boundaries.
It checks getter return values, inferred custom attributes, consumed item data,
input event targets, input refs, `refKey` options, common getter options and the
adapter's generic getter wrapper. Invalid ARIA/value/attribute assignments must
fail rather than disappear through `any`.

The shared label container consumes only the zero-argument getter's id and
htmlFor output; it does not claim to expose generic label options.

Known emitted custom-item fields (id, role, ARIA, mouse handlers and disabled
state) have concrete types. The pre-existing public extension index remains
available for arbitrary consumer-specific fields. Upstream getter return refs
still use Downshift's `AnyRef`; these fixtures do not claim to make every
upstream ref slot precise or to model a `refKey` as a mapped return key.

Private input getters and callbacks expose HTMLInputElement targets. Existing
public event callback signatures remain broader to preserve both passing old
handlers into the component and forwarding props to existing wrappers. Both
directions are checked. Combobox toggle refs share the historical button-declaration /
actual-div limitation as the Select trigger. A public ref-contract correction
needs its own compatibility decision rather than a silent change here.
