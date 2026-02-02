# UI Branding Plan — Ordinant.ai

Plan for changing all user-facing UI from Kilo Code / Roo Code to Ordinant.ai. Items are grouped by area and ordered so you can tackle them in phases.

## ✅ Completed (Phases 1–4)

- **Phase 1:** HTML title, all `package.nls.*.json`, walkthrough markdown, community/support links in webview settings (all locales).
- **Phase 2:** Extension i18n (`src/i18n/locales/*` — common, kilocode, mcp, tools, jetbrains, marketplace); webview settings.json (all locales), docLinks.ts, provider labels.
- **Phase 3:** All webview locale JSON (welcome, chat, cloud, kilocode, prompts, mcp, marketplace, agentManager, etc.); "Roo Code Cloud" → "Ordinant Cloud", "Roomote Control" → "Remote Control".
- **Phase 4:** Hardcoded strings in webview (docLinks, constants, slash-commands, KiloCode.tsx, KiloLogo.tsx, Roo.tsx); extension-side UI (ClineProvider, registerCommands, Terminal, notifications, deviceAuthHandler, API constants, vscode-lm, Task, MCP/OAuth, roo.ts, image-generation, wrapper, ShadowCheckpointService, STT glossary); HTML titles in ClineProvider and McpOAuthBrowserFlow; test expectations updated.

**Remaining (optional):** Phase 5 — rename `kilocode.json` → `ordinant.json`, `components/kilocode/` → `components/ordinant/` (requires code and i18n key updates). Some comments and internal identifiers (e.g. `@kilo.ai` domain check, `kilocode` provider id) left as-is.

---

## 1. Static HTML & entry points

| #   | Location                | Current                    | Change to                    |
| --- | ----------------------- | -------------------------- | ---------------------------- |
| 1.1 | `webview-ui/index.html` | `<title>Kilo Code</title>` | `<title>Ordinant.ai</title>` |

---

## 2. Extension package display strings (all locales)

**Path:** `src/package.nls.*.json` (22 locale files)

Already done for the default locale in `src/package.nls.json`. For each other locale file (`package.nls.ar.json`, `package.nls.de.json`, etc.):

- Replace display name: `"Kilo Code: ..."` → `"Ordinant.ai: ..."`
- Replace any other user-visible "Kilo Code" / "Kilo" with "Ordinant.ai" / "Ordinant" in descriptions and titles.

**Files:**  
`src/package.nls.ar.json`, `package.nls.ca.json`, `package.nls.cs.json`, `package.nls.de.json`, `package.nls.es.json`, `package.nls.fr.json`, `package.nls.hi.json`, `package.nls.id.json`, `package.nls.it.json`, `package.nls.ja.json`, `package.nls.ko.json`, `package.nls.nl.json`, `package.nls.pl.json`, `package.nls.pt-BR.json`, `package.nls.ru.json`, `package.nls.th.json`, `package.nls.tr.json`, `package.nls.uk.json`, `package.nls.vi.json`, `package.nls.zh-CN.json`, `package.nls.zh-TW.json`

---

## 3. Extension i18n — `src/i18n/locales/`

**3a. `common.json` (20 locales)**  
Path: `src/i18n/locales/<locale>/common.json`

- `extension.name`: "Kilo Code" → "Ordinant.ai"
- `extension.description`: keep or align with Ordinant.ai copy
- `auto_import_failed` / `auto_import_success`: "Kilo Code" → "Ordinant.ai"
- `task_prompt`: "Kilo Code" / "What should Kilo Code do?" → "Ordinant.ai" / equivalent
- `cloud_auth_required` / `organization_mismatch`: "Roo Code Cloud" → "Ordinant Cloud" (or your chosen cloud name)
- `authenticationRequired`: "Roo Code Cloud" → "Ordinant Cloud"
- `.kilocodemodes` in `yamlParseError` / `schemaValidationError`: decide whether to keep filename (`.kilocodemodes`) or document as legacy; optionally add "Ordinant" in the message text if you rename the file later.

**3b. `kilocode.json` (20 locales)**  
Path: `src/i18n/locales/<locale>/kilocode.json`

- Replace all user-visible "Kilo Code" / "Kilo" / "kilocode" with "Ordinant.ai" / "Ordinant" where it’s UI copy (not keys or technical identifiers).

**3c. `mcp.json`, `tools.json`, `jetbrains.json`, `marketplace.json`, `embeddings.json`**

- In each locale, search for "Kilo Code", "Roo Code", "Kilo", "kilocode" and replace with Ordinant.ai branding where it’s user-facing text.

**Locales:** ar, ca, cs, de, en, es, fr, hi, id, it, ja, ko, nl, pl, pt-BR, ru, th, tr, uk, vi, zh-CN, zh-TW (subset per file).

---

## 4. Webview UI i18n — `webview-ui/src/i18n/locales/`

**4a. `settings.json` (20 locales)**  
Path: `webview-ui/src/i18n/locales/<locale>/settings.json`

- `sections.about`: "About Kilo Code" → "About Ordinant.ai"
- `about.community`: "Kilo Code users" → "Ordinant.ai users"; replace links:
    - `reddit.com/r/kilocode` → your Reddit (e.g. `reddit.com/r/ordinant`) or remove
    - `kilo.ai/discord` → your Discord (e.g. `ordinant.ai/discord`)
- `cloud` / auth-related: "Roo Code Cloud" → "Ordinant Cloud"
- Search for "Kilo Code", "Roo Code", "kilo.ai", "kilocode" and replace with Ordinant.ai / ordinant.ai / your URLs.

**4b. `kilocode.json` (20 locales)**

- Same as 3b: replace user-visible Kilo/kilocode with Ordinant.ai/Ordinant.

**4c. `welcome.json`**

- Replace "Kilo Code" / "Kilo" with "Ordinant.ai" / "Ordinant" in welcome text and CTAs.

**4d. `chat.json`**

- Replace any "Kilo Code", "Kilo", "Roo Code" in chat UI strings.

**4e. `cloud.json`**

- "Roo Code Cloud" / "Kilo Code Cloud" → "Ordinant Cloud" (or your product name).

**4f. `prompts.json`, `mcp.json`, `marketplace.json`, `agentManager.json`**

- Search and replace Kilo/Roo branding in user-facing strings.

---

## 5. Walkthrough (first-run) content

**Path:** `src/walkthrough/`

| File       | Action                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------- |
| `step1.md` | Replace "Kilo Code" with "Ordinant.ai"; update alt text (e.g. "Prompting Ordinant.ai to Build..."). |
| `step2.md` | Same.                                                                                               |
| `step3.md` | Same.                                                                                               |
| `step4.md` | Same.                                                                                               |
| `step5.md` | Same.                                                                                               |

Optional: rename image alts and any internal references from "Kilo Code" to "Ordinant.ai".

---

## 6. Webview UI — hardcoded / code-level strings

**6a. Components that may show brand name**

- `webview-ui/src/components/settings/About.tsx` — "Kilo Code" in copy or links
- `webview-ui/src/components/settings/SettingsView.tsx` — any Kilo/Roo strings
- `webview-ui/src/components/kilocode/*` — component labels, tooltips, placeholders (prefer moving strings to i18n and then updating locale files)
- `webview-ui/src/components/chat/ChatTextArea.tsx` — placeholders / hints
- `webview-ui/src/components/welcome/WelcomeViewProvider.tsx` — welcome content
- `webview-ui/src/App.tsx` — titles or fallbacks

**6b. Links and docs**

- `webview-ui/src/utils/docLinks.ts` — replace kilo.ai / Kilo docs URLs with ordinant.ai (or your docs).
- Any `kilo.ai`, `github.com/Kilo-Org/kilocode`, `reddit.com/r/kilocode`, `discord.gg/kilocode` in:
    - `webview-ui/src/**/*.{ts,tsx}`
    - i18n JSON (already listed in §4)

**6c. Provider / feature labels**

- Settings UI that mentions "Roo Code Router", "Roo Code Cloud", "Kilo Code" (e.g. in `webview-ui/src/components/settings/constants.ts`, provider list, ApiOptions, etc.): replace with "Ordinant" / "Ordinant Cloud" where user-visible.

---

## 7. Extension-side code (UI messages only)

Limit to strings that are shown in UI (not internal IDs):

- `src/extension.ts` — first-run message (already updated); any other user-visible "Kilo Code" in logs or messages.
- `src/core/webview/*.ts` — any `outputChannel.appendLine` or user-facing messages that say "Kilo Code" or "Roo Code".
- Search: `src/**/*.ts` for string literals containing "Kilo Code", "Roo Code", "Kilo" used in notifications, errors, or prompts shown to the user; replace with Ordinant.ai.

Do **not** change command IDs, config keys, or view IDs (e.g. `kilo-code.*`, `kilocode.ghost.*`) in this pass.

---

## 8. Community / support links (all locales)

Decide your official links, then replace everywhere (i18n + code):

| Current                        | Replace with (example)                             |
| ------------------------------ | -------------------------------------------------- |
| `kilo.ai/discord`              | `ordinant.ai/discord` (or your Discord URL)        |
| `kilo.ai/support`              | `ordinant.ai/support`                              |
| `reddit.com/r/kilocode`        | Your subreddit or remove                           |
| `github.com/Kilo-Org/kilocode` | Your repo (e.g. `github.com/Ordinant/ordinant-ai`) |
| `blog.kilo.ai`                 | Your blog URL                                      |

Apply in:

- All `webview-ui/src/i18n/locales/*/settings.json` (community, feedback, support)
- Any other locale files and `docLinks.ts` that reference these URLs.

---

## 9. Optional / later

- **Rename i18n namespace/file:** `kilocode.json` → e.g. `ordinant.json` (requires updating all imports/keys that reference `kilocode` in i18n).
- **Rename folder:** `webview-ui/src/components/kilocode/` → e.g. `ordinant/` (requires updating all imports and any references in tests/config).
- **Logo/icon:** Already documented in root `BRANDING.md`; ensure any "Kilo" in icon descriptions or asset names in package.json is updated if you add new assets.

---

## Suggested order of work

1. **Phase 1 — High visibility**

    - 1.1 `webview-ui/index.html` title
    -   2. All `src/package.nls.*.json` (extension display name/descriptions)
    -   5. Walkthrough markdown (`src/walkthrough/*.md`)
    -   8. Set and replace community/support links in en (then other locales)

2. **Phase 2 — Settings & about**

    - 4a. `webview-ui/.../settings.json` (all locales): About, community, cloud
    - 6a. About.tsx, SettingsView, docLinks.ts
    - 6c. Provider/cloud labels in constants and settings UI

3. **Phase 3 — All other locales**

    -   3. `src/i18n/locales/<locale>/*.json` (common, kilocode, mcp, tools, etc.)
    - 4b–4f. Rest of `webview-ui/src/i18n/locales/<locale>/*.json`

4. **Phase 4 — Remaining UI copy in code**

    - 6b. Any remaining links in TS/TSX
    -   7. Extension-side UI messages and logs

5. **Phase 5 — Optional**
    -   9. File/folder renames and deeper refactors

---

## Checklist summary

- [x] 1.1 `webview-ui/index.html` title
- [x]   2. Extension `package.nls.*.json` (22 files)
- [x]   3. `src/i18n/locales/*` — common, kilocode, mcp, tools, jetbrains, marketplace, embeddings
- [x]   4. `webview-ui/src/i18n/locales/*` — settings, kilocode, welcome, chat, cloud, prompts, mcp, marketplace, agentManager
- [x]   5. `src/walkthrough/*.md` (5 files)
- [x]   6. Webview components & docLinks (About, Settings, constants, docLinks.ts, etc.)
- [x]   7. Extension UI messages (extension.ts, webview handlers)
- [x]   8. Community/support URLs in all locales and code
- [ ]   9. Optional: file/folder renames (kilocode → ordinant)

Use find/replace with care: prefer targeting user-facing strings only; avoid changing config keys, command IDs, or i18n keys unless you are doing a full rename (e.g. kilocode → ordinant).
