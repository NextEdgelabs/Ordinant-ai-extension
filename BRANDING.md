# Branding (Ordinant.ai)

## What was fixed

- **Extension identity**: Package name is `ordinant-ai`; publisher and author use Ordinant.ai.
- **User-facing strings**: Display name, sidebar title, menus, and settings descriptions show "Ordinant.ai" (see `src/package.nls.json`).
- **Keywords**: Extension keywords use "ordinant", "Ordinant", "ordinant-ai" instead of Kilo.
- **First-run**: First install message and walkthrough ID use Ordinant.ai; walkthrough ID is `ordinantWalkthrough`.
- **Internal IDs**: Commands, views, and config keys still use the `kilo-code.*` prefix so existing code and behavior stay compatible.

## Changing the logo

The extension now uses **Ordinant** assets:

| File                                    | Use                                                                          |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| `src/assets/icons/ordinant.png`         | Extension icon (marketplace), Activity bar, sidebar, commands, notifications |
| `src/assets/icons/kilo-icon-font.woff2` | Icon font (contribution id: `ordinant-logo`) — overwrite to rebrand          |

Paths in `src/package.json`, `registerCommands.ts`, `AgentManagerProvider.ts`, and `notifications/index.ts` point to the appropriate Ordinant icons.

## JetBrains Plugin

| File                                                          | Use                                     |
| ------------------------------------------------------------- | --------------------------------------- |
| `jetbrains/plugin/src/main/resources/icons/ordinant.png`      | Tool window icon, commit message, menus |
| `jetbrains/plugin/src/main/resources/icons/ordinant_dark.png` | Dark theme variant                      |

## Webview UI

The webview components use CSS-based theme switching to display the appropriate logo:

- `webview-ui/src/assets/logo-light-theme.png` (for light VS Code themes)
- `webview-ui/src/assets/logo-dark-theme.png` (for dark VS Code themes)

## Remaining "Kilo" / "Roo Code" in the repo

- **Code**: Many `.ts` files and packages still use identifiers like `kilo-code`, `kilocode`, or `roo-code` (commands, config keys, package names). Changing those would require a large refactor and can break settings/keybindings.
- **Locales**: `src/i18n/locales/*/common.json` and `webview-ui/src/i18n/locales/*/settings.json` still contain "Kilo Code" and "Roo Code Cloud" in translated strings. To fully rebrand the UI, replace those with "Ordinant.ai" / "Ordinant Cloud" in each locale.
