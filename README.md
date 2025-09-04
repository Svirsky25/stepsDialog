# Steps Dialog

A flexible and customizable multi-step dialog component for React applications, built with TypeScript and Material-UI.

## Features

- 🚀 **TypeScript Support** - Fully typed with comprehensive type definitions
- 🎨 **Customizable** - Flexible styling and layout options
- 📱 **Responsive** - Works seamlessly across different screen sizes
- 🔧 **Form Integration** - Built-in React Hook Form integration with validation
- 🎯 **Type-Safe** - Strongly typed step definitions and form schemas
- 🌟 **Material-UI** - Built on top of MUI components

## Installation

```bash
npm install steps-dialog
# or
yarn add steps-dialog
# or
pnpm add steps-dialog
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled react-hook-form @hookform/resolvers zod lodash
```

## Quick Start

```tsx
import { StepDialog, useStepDialog } from 'steps-dialog';

// Define your step schema
const steps = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(18, "Must be 18 or older"),
});

// Create step definitions
const stepDefinitions = [
  {
    key: "step1",
    schema: z.object({ name: z.string().min(1) }),
    Layout: YourFirstStepComponent,
  },
  {
    key: "step2", 
    schema: z.object({ age: z.number().min(18) }),
    Layout: YourSecondStepComponent,
  }
];

function App() {
  const dialog = useStepDialog();

  return (
    <div>
      <button onClick={dialog.openDialog}>
        Open Step Dialog
      </button>
      
      <StepDialog 
        steps={stepDefinitions} 
        {...dialog.dialogProps} 
      />
    </div>
  );
}
```

## API Reference

### Components

#### `<StepDialog>`
Main dialog component that renders the multi-step interface.

**Props:**
- `steps` - Array of step definitions
- `open` - Boolean to control dialog visibility
- `onClose` - Callback when dialog closes
- `onSubmit` - Callback when all steps are completed

#### Step Layout Components
Each step should implement the `StepLayoutProps` interface:

```tsx
interface StepLayoutProps {
  onNext: () => void;
  onPrevious: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  stepIndex: number;
  stepsAmount: number;
  formMeta: FormMeta;
}
```

### Hooks

#### `useStepDialog()`
Hook for managing dialog state.

Returns:
- `openDialog()` - Function to open the dialog
- `dialogProps` - Props to spread on `<StepDialog>`

#### `useStepForm<T>()`
Hook for form management within steps.

Returns React Hook Form utilities:
- `control` - Form control object
- `getValues()` - Get current form values
- `validateFields()` - Validate current step
- `formState` - Form state including errors
- `watch()` - Watch form fields

### Utility Components

- `<ControlledField>` - Pre-configured form field component
- `<Header>` - Step header component
- `<Footer>` - Step footer with navigation buttons
- `<Title>` - Dialog title component

## Example

See the `/example` folder in the repository for a complete working example.

## Development

```bash
# Install dependencies
pnpm install

# Run example in development
pnpm dev

# Build the library
pnpm build

# Run example build
pnpm build:example
```

## License

MIT
