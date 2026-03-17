# AGENTS

## Structure
- Source: src/
- Tests: test/
- Examples: examples/
- Build: dist/ and bundle.js
- Config: tsconfig.json, typedoc.json, .eslintrc.js
- Docs: README.md, CHANGELOG.md

## Commands
- Install: npm install
- Build: npm run build
- Tests: npm test
- Lint: npm run lint (if defined in package.json)
- Typecheck: npm run typecheck (if defined)

## Conventions
- TypeScript in src/
- Unit tests under test/

## Release
- Build generates dist/ and bundle.js
- Do not edit dist/ by hand (generated)
