# Thai NLEM Drug Search

```
███╗   ██╗██╗     ███████╗███╗   ███╗
████╗  ██║██║     ██╔════╝████╗ ████║
██╔██╗ ██║██║     █████╗  ██╔████╔██║
██║╚██╗██║██║     ██╔══╝  ██║╚██╔╝██║
██║ ╚████║███████╗███████╗██║ ╚═╝ ██║
╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝     ╚═╝
```

---

## ◆ PULSE

The essential medicines list is a reference; a reference you must
download to consult is a reference nobody consults. This web app puts
the National List of Essential Medicines behind a single search box:
type a generic name, and the debounced query answers with the drug's
dosage forms and its NLEM account level - บัญชี ก, ข, ค - with every
UI state spoken aloud: loading, error, or an honest "no results".
A thin, fast client for the [thai-nlem-api](https://github.com/suradet-ps/thai-nlem-api).

| Live search ▣ | Debounced ▣ | Clear states ▣ | Thai-first ▣ |
|---|---|---|---|

*The lookup loop - type, answer, explain - is sealed.*

> Built with Vue 3 + TypeScript + Vite, served by the public
> thai-nlem-api on Render - the front door to Thailand's essential
> medicines.
>
> **suradet-ps**, artifact keeper

---

## ◆ IGNITION

One runtime, three commands.

```
⟫ git clone https://github.com/suradet-ps/thai-nlem-webapp.git
⟫ cd thai-nlem-webapp
⟫ npm install
⟫ npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The release artifact: `⟫ npm run build` - output in `dist/`, deployable
to any static host.

<details>
<summary>Prerequisites</summary>

- Node.js 18+ and npm
- The [thai-nlem-api](https://github.com/suradet-ps/thai-nlem-api)
  running at `https://thai-nlem-api.onrender.com/` (or your own
  instance)

</details>

---

## ◆ ANATOMY

One search box, one store, an honest answer for every state.

- **Searches** - generic-name lookup against
  `/api/drugs/search?q={query}` - the question a pharmacist or
  developer types is the question the list answers.
- **Debounces** - requests wait for the pause between keystrokes, so
  the network carries one query, not ten - fast to type, light to
  run.
- **Explains** - each card carries the generic name, the available
  dosage forms, and the NLEM account level (บัญชี ก, ข, ค) - the
  three facts a consult needs.
- **States** - loading, error, and no-results each have their own
  face - the interface never lets silence stand in for an answer.
- **Stores** - the search logic lives in a Pinia store, so the
  components stay thin and the query state stays consistent.

---

## ◆ RITUALS

**The core ceremony** - the essential-medicine consult:

1. Open the page. One search box, no ceremony required.
2. Type the generic name. The debounce waits, then the query flies.
3. Read the cards: dosage forms, account level, the facts in Thai.
4. Consult and close - loading, error, and empty each told their
   truth on the way.

**The ceremony of the pause** - the request waits for the reader, not
the reader for the request: debounce means one answer per question,
with the network thanked for its restraint.

**The ceremony of the spoken state** - no silent spinner, no blank
page: loading is said to be loading, errors are said to be errors,
and "no results" is an answer, not a void.

---

## ◆ ECHOES

**Where this artifact is heading**

```
search   ▸ live generic-name lookup ─────────────────────────────────── ▸ sealed
debounce ▸ efficient network use ────────────────────────────────────── ▸ sealed
explain  ▸ dosage forms + account level cards ───────────────────────── ▸ sealed
states   ▸ loading / error / no-results UI ──────────────────────────── ▸ sealed
```

**Raising the artifact** - the components live in `src/components/`;
the search store in `src/stores/`. Lint and format checks are wired
(`eslint` + `prettier`). Open an issue first to discuss a change.

**Status** - dependencies are maintained through Renovate.

---

```
  ─────────────────────────────────────────
   A reference behind a login is a reference
   that answers only the logged-in.
  ─────────────────────────────────────────
```

Open source.