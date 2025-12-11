# HR Workflow Designer (Prototype)

A minimal React + TypeScript prototype that lets you build simple HR workflows on a canvas, edit node properties, validate the structure, and simulate execution — all with a mocked API.

## Stack
- Vite + React + TypeScript
- React Flow (canvas)
- Zustand (state)
- React Hook Form + Zod (forms & validation)
- MSW (mock /automations and /simulate)

## Quick Start
```bash
npm i
npm run dev
```

> Requires Node 18+.

## What you can do
- Add nodes (Start, Task, Approval, Automated, End)
- Drag to reposition, click to select
- Connect nodes by dragging edges
- Edit fields in the right panel
- Validate and simulate the workflow (Test / Sandbox)

## Project Structure
- **src/canvas/**: React Flow canvas + validators
- **src/nodes/**: visual components for node types
- **src/forms/**: editing forms for node data
- **src/panels/**: side panels (NodeFormPanel, TestSandbox, Sidebar)
- **src/api/**: fetch helpers and endpoints
- **src/mocks/**: MSW mock server

## Extending
- Add custom edge types
- Persist workflows (replace MSW with real API)
- Export/Import JSON
- Undo/Redo, versioning, mini-map, auto-layout
