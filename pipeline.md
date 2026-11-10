# Repo Gym pipeline

A reusable four-pass method for turning a repository into auto-graded exercises. Point it at another repository to generate a new pack.

## Input criteria

- A permissively licensed repository (MIT, Apache-2.0, BSD).
- Small pure functions with at most three internal dependencies.
- Browser-runnable JavaScript, or a language with an equivalent in-browser runner.
- An existing test suite is useful as a seed for edge cases; rewrite assertions, do not copy tests wholesale.

## Stick 1 — Repo analyst

> You are a codebase analyst. In the repository:
> 1. List source files (exclude `node_modules`, `dist`, `test`).
> 2. Identify entry points and core modules.
> 3. Pick 10 pure functions suitable for exercises: no IO, no global state, independent logic, browser-runnable. For each, give `file:line`, signature, responsibility and internal dependencies.
> 4. Note which exercise type fits each function: `bugfix`, `fillin` or `feature`.
> 5. Output `analysis.json` and `candidates.md`.
> 6. Report the licence and copyright header.
>
> Do not modify the repository.

## Stick 2 — Exercise designer

> Based on `candidates.md`, write one exercise per function into `exercises/<id>.json`:
>
> ```json
> {
>   "id": "...",
>   "title": "...",
>   "type": "bugfix | fillin | feature",
>   "difficulty": "easy | medium | hard",
>   "source": "src/lib/...:line",
>   "entry": "functionName",
>   "description": "task statement, no answer",
>   "starter_code": "self-contained single file; bugfix = seeded defect, fillin = core logic removed, feature = current implementation",
>   "reference_solution": "complete correct implementation with helpers inlined",
>   "tests": [{ "name": "...", "expr": "expression that evaluates to true" }],
>   "hints": ["...", "..."],
>   "explanation": "..."
> }
> ```
>
> Requirements:
> - Inline every helper; no `import` or `require`.
> - A `bugfix` defect must be semantically real, not a typo.
> - A `fillin` must remove the core loop or check while keeping the signature.
> - A `feature` must extend the existing option/contract without breaking current behaviour.
> - 8–12 test expressions per exercise, covering normal, boundary and error cases.
> - Seed ideas from the repository tests, but rewrite them as independent assertions.

## Stick 3 — Independent auditor

> You are an independent auditor. Read only `exercises/*.json`; do not trust the designer.
>
> 1. For every exercise, run the tests against the reference solution (all must pass) and against the starter (at least one must fail).
> 2. Apply three semantic mutations to each reference solution — change a return value, remove a branch, change a boundary — and run the tests against each mutant. Every mutant must be caught.
> 3. Output `audit.md`: exercise × reference pass × starter fail × mutant 1/2/3 caught.
> 4. Mark each exercise `strong`, `weak` or `reject`; for weak ones, state the fix.
>
> Do not modify the exercises; report only.

An honest audit sometimes finds an equivalent mutant — a change that cannot be observed through the public API. Document it instead of pretending it was killed.

## Stick 4 — Site builder

> Build a static site:
> - exercise list with type and difficulty filters;
> - code editor, run-tests button, per-case pass/fail output;
> - execute user code and tests inside a `sandbox="allow-scripts"` iframe;
> - hints and reference solution collapsed by default;
> - progress in `localStorage`; mobile layout; no backend, no CDN, no external fonts.

## Acceptance matrix

| Check | Requirement |
|---|---|
| Reference solution | passes every test |
| Starter code | fails at least one test |
| Mutants | all caught, or documented as equivalent |
| Self-contained code | no imports or requires in exercises |
| UI sandbox | user code runs only inside the iframe |
| Privacy | no personal data in the published repo |

## Course layer

Once a pack exists:

1. Group exercises into 4–5 chapters, each with a short lesson (concept, worked example, key idea).
2. Add a capstone that combines the chapter rules into one realistic feature.
3. Use XP to reward lessons and exercises: lesson 15, easy 10, medium 20, hard 30, project 50.
4. Keep the course data in `curriculum.json` and generate `window.CURRICULUM` alongside `window.EXERCISES`.
