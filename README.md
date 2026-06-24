# Payloadvg

Client-side payload library and cheatsheet for authorised security testing.
Browse a curated catalogue of payloads, build parameterised reverse shells and
apply encoders — **entirely in the browser**. There is no backend.

Part of the [project hub](https://sergiogbernardo.github.io/), alongside
[Bytevg](https://sergiogbernardo.github.io/Bytevg/),
[Scanvg](https://sergiogbernardo.github.io/Scanvg/) and
[Loghivevg](https://sergiogbernardo.github.io/Loghivevg/).

> **Intended use:** authorised penetration testing, CTFs and security education.
> The payloads are public cheatsheet content; using them against systems you do
> not have permission to test is illegal.

## Modules

- **Payload catalogue** — a searchable collection grouped by category (XSS,
  SQLi, LFI, SSTI, …) with usage context for each entry.
- **Reverse shells** — a parameterised generator (IP, port, shell) for bash,
  python, nc, PowerShell and others.
- **Encoders** — URL, base64, hex and common bypass variants applied to the
  selected payload.
- **Search** — fast filtering by name, category and tag, with one-click copy.

## Stack

React + TypeScript + Vite + Tailwind. The catalogue is static data bundled with
the app; everything runs locally. No backend, no tracking.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview
```

The Vite `base` is `/Payloadvg/` to match GitHub Pages. Deployment is automated
by `.github/workflows/deploy.yml` on every push to `main`.
