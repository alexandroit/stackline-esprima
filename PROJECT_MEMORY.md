# Project Memory

- Package: `@stackline/esprima`
- Upstream compatibility target: `esprima@4.0.1`
- Public API compatibility value: `esprima.version === '4.0.1'`
- Stackline release line starts at `1.0.0`.
- Runtime graph must remain free of production, optional, and peer dependency
  edges unless a reviewed compatibility requirement makes one unavoidable.
- Existing Esprima imports are preserved with the exact npm alias
  `esprima: npm:@stackline/esprima@<version>`.
- Resolve and publish dependency leaves before updating dependent packages.
- Never publish until upstream, differential, hostile input, stress, browser,
  CLI, TypeScript 3.9/current, clean pack-install, npm tree, and audit gates pass.
- Preserve the upstream BSD-2-Clause attribution in every distribution.
- TypeScript 5.9.3 is intentional: TypeScript 7 removed the ES5 target needed
  by the Node.js 8 compatibility build. Dependabot ignores TypeScript 6+ until
  that runtime contract can be preserved by a validated build path.
