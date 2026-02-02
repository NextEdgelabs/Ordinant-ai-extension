# Branding (Ordinant.ai)

## What was fixed

- **Extension identity**: Package name is `ordinant-ai`; publisher and author use Ordinant.ai.
- **User-facing strings**: Display name, sidebar title, menus, and settings descriptions show "Ordinant.ai" (see `src/package.nls.json`).
- **Keywords**: Extension keywords use "ordinant", "Ordinant", "ordinant-ai" instead of Kilo.
- **First-run**: First install message and walkthrough ID use Ordinant.ai; walkthrough ID is `ordinantWalkthrough`.
- **Internal IDs**: Commands, views, and config keys still use the `kilo-code.*` prefix so existing code and behavior stay compatible.

## Changing the logo

The extension now uses **Ordinant** assets:

| File                                    | Use                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------- |
| `src/assets/icons/ordinant.png`         | Extension icon, activity bar (light and dark), command icon, notifications |
| `src/assets/icons/kilo-light.svg`       | Commit message / editor title (light) — overwrite file to rebrand          |
| `src/assets/icons/kilo-dark.svg`        | Commit message / editor title (dark) — overwrite file to rebrand           |
| `src/assets/icons/kilo-icon-font.woff2` | Icon font (contribution id: `ordinant-logo`) — overwrite to rebrand        |

Paths in `src/package.json`, `registerCommands.ts`, and `notifications/index.ts` point to `ordinant.png`. To use a different dark icon, add e.g. `ordinant-dark.png` and update the `darkIcon` paths.

## Remaining "Kilo" / "Roo Code" in the repo

- **Code**: Many `.ts` files and packages still use identifiers like `kilo-code`, `kilocode`, or `roo-code` (commands, config keys, package names). Changing those would require a large refactor and can break settings/keybindings.
- **Locales**: `src/i18n/locales/*/common.json` and `webview-ui/src/i18n/locales/*/settings.json` still contain "Kilo Code" and "Roo Code Cloud" in translated strings. To fully rebrand the UI, replace those with "Ordinant.ai" / "Ordinant Cloud" in each locale.
