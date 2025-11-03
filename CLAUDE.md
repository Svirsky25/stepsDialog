# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run example/development server
pnpm dev

# Build the library for distribution
pnpm build

# Build example application
pnpm build:example

# Lint code
pnpm lint

# Preview example build
pnpm preview
```

## Project Architecture

This is a React library that provides a multi-step dialog component with form validation. The architecture follows these key patterns:

### Core Structure
- **Library source**: `src/StepDialog/` - Main library components and logic
- **Example app**: `example/` - Development/demo application showing usage
- **Dual build system**: 
  - Library build via `vite.lib.config.ts` (ES modules for npm distribution)
  - Example build via `example/vite.config.ts` (standard React app)

### Key Components Architecture
- **StepDialog.tsx**: Main dialog component that provides form context via React Hook Form's FormProvider
- **DialogRoot.tsx**: Core dialog logic handling step navigation and validation orchestration
- **Step Type System**: Uses TypeScript generics and Zod schemas for type-safe step definitions
- **Form Integration**: Built on React Hook Form with Zod resolvers for validation
- **Material-UI Foundation**: All UI components built on MUI with Emotion styling

### Type System Design
- **Step<Id, Shape>**: Generic type for defining individual steps with typed validation schemas
- **AllFormValues<T>**: Utility type that merges all step schemas into a unified form type using union-to-intersection transformation
- **StepLayoutProps**: Interface that all step layout components must implement

### Form State Management Pattern
The library uses a centralized form approach:
1. All step schemas are merged into one Zod schema in `StepDialog.tsx`
2. Single React Hook Form instance manages entire multi-step form state
3. Individual steps access form context via `useStepForm` hook
4. Validation happens per-step but data persists across all steps

### Key Utilities
- `mergeStepsShapes()`: Combines multiple Zod schemas into unified validation schema
- `extractStepsDefaultValues()`: Extracts default values from step schemas
- Union-to-intersection type transformation for merging step types

### Styling Approach
Uses Material-UI theming with Emotion for styling. Components are designed to be themeable and customizable via MUI's theme system.

### External Dependencies
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation and TypeScript integration  
- **Material-UI + Emotion**: UI components and styling
- **Lodash**: Utility functions

The library is designed as a peer-dependency-heavy package where consuming applications provide React, MUI, and other core dependencies.