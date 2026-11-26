---
sidebar_position: 2
sidebar_label: Install
---
# Install BAS Guard

BAS Guard supports macOS and Linux. Windows is build-from-source only.

## From npm

The binary ships inside the package, so nothing is fetched at install time.

```bash
# Vet one thing before installing it
npx --yes @bas.io/guard@latest check ./some-skill

# Audit this machine's whole setup
npx --yes @bas.io/guard@latest scan --report

# Or install it, which puts `bas-guard` on your PATH
npm i -g @bas.io/guard
```

:::caution
Do not install the load-time gate from an `npx` run. `bas-guard hook install` registers the absolute path of the binary it ran from, and the `npx` path is a cache that npm later reclaims. Use `npm i -g` or a release binary for the gate.
:::

## Prebuilt binary

Pick your platform from `darwin-arm64`, `darwin-amd64`, `linux-amd64` and `linux-arm64`, then download, verify and install:

```bash
REPO=basdotio/bas-guard
PLAT=darwin-arm64
curl -fsSLO "https://github.com/$REPO/releases/latest/download/bas-guard-$PLAT"
curl -fsSLO "https://github.com/$REPO/releases/latest/download/SHA256SUMS.txt"

# Verify the checksum before running it (on Linux use sha256sum)
shasum -a 256 --ignore-missing -c SHA256SUMS.txt
chmod +x "bas-guard-$PLAT" && sudo mv "bas-guard-$PLAT" /usr/local/bin/bas-guard
```

There is deliberately no `curl ... | sh` installer. BAS Guard reports piping `curl` into a shell as a high-severity finding, so it does not ask you to do it.

## From source

Requires Go 1.23 or later.

```bash
git clone https://github.com/basdotio/bas-guard && cd bas-guard
make build
```

## Claude Code plugin

The plugin ships three skills and six slash commands, so you can ask for an audit in plain language.

In the terminal version of Claude Code:

```
/plugin marketplace add basdotio/bas-guard
/plugin install basguard@bas-guard
```

In the VS Code or JetBrains extension, run the same steps from a shell:

```bash
claude plugin marketplace add basdotio/bas-guard
claude plugin install basguard@bas-guard
```

Restart Claude Code, then run `/bas-guard-setup`. It installs the `bas-guard` binary if it is missing, runs the first scan, walks through the findings with you and offers the load-time gate.

| Command | Purpose |
|---|---|
| `/bas-guard-setup` | Binary, first scan, fix plan and gate in one flow |
| `/bas-guard-scan [root]` | Audit a config root and triage the findings |
| `/bas-guard-vet <path or url>` | Vet one skill, plugin or file before installing or committing it |
| `/bas-guard-gate [action]` | Install, inspect or repair the load-time gate and manage approvals |
| `/bas-guard-help` | How to use it, in plain language |
| `/bas-guard-llm [status, test or setup]` | Set up or check the optional LLM deep check |

The plugin adds no MCP server and registers no hooks of its own. Installing the gate stays an explicit step.
