# TODO

- [x] Preserve the Esprima 4.0.1 public contract.
- [x] Remove all production dependency edges.
- [x] Replace the historical build graph with maintained tooling.
- [x] Add differential, security, stress, browser, CLI, type, and pack tests.
- [ ] Evaluate future security reports without changing the accepted grammar.
- [ ] Revalidate maintained development tooling in each release cycle.
- [ ] Revisit TypeScript 7+ only when it can emit the ES5 runtime required by
  the Node.js 8 compatibility contract; Dependabot intentionally ignores that
  incompatible major today.
