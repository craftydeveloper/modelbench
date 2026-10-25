# ModelBench

A repeatable model evaluation harness for quality, latency, token use, and cost comparisons.

## Why this project

ModelBench runs comparable cases across model or prompt versions. It reports success rate, percentile latency, token volume, and measured cost together so quality changes are not evaluated in isolation.

## What is included

- A typed domain core with a project-specific algorithm.
- A small HTTP API for creating and listing local records.
- An in-memory repository interface that can be replaced by durable storage.
- Unit and HTTP tests, strict type checking, and continuous integration.
- Operational and architecture notes that call out the prototype boundaries.

## Quick start

Requirements: Node.js 22 or newer.

```sh
npm install
npm run typecheck
npm test
npm run dev
```

The development server binds to `127.0.0.1` by default. Set `HOST` and `PORT` to change the local address. The record API is intended for development until authentication, durable storage, rate limits, and deployment controls are added.

## API

- `GET /healthz` returns service health.
- `GET /api/records` lists records in the in-memory store.
- `GET /api/records/:id` retrieves one record.
- `POST /api/records` validates and creates a record.

## Quality bar

Run `npm run typecheck` and `npm test` before proposing a change. Keep domain logic deterministic, document data assumptions, and add regression tests for edge cases.

## License

MIT. See `LICENSE`.