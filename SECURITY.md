# Security

Report suspected vulnerabilities privately through the GitHub security
advisory form for `alexandroit/stackline-esprima`. Do not disclose an unfixed
vulnerability in a public issue.

Include the affected version, source sample, options, runtime, observed impact,
resource measurements, and a minimal reproduction. Maintainers will validate
the report and coordinate disclosure with a fixed release.

## Supported line

The latest published `1.x` release is supported on Node.js 8 and newer.

## Dependency statement

Version 1.0.0 has no production, optional, or peer dependencies. Release gates
require a warning-free packed install, a valid npm tree, and zero production
and full-lockfile audit findings.

## Untrusted input

The parser does not execute parsed source. Parsing still consumes CPU and
memory. Applications accepting untrusted input must enforce maximum input
size, concurrency, memory, and request deadlines at their trust boundary.
