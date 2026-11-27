---
sidebar_position: 1
sidebar_label: Overview
---
# BAS Guard

BAS Guard (`bas-guard`) is a local, offline security scanner and cleanup tool for AI agent environments. AI coding agents automatically load many external things, such as skills, MCP servers, hooks, subagents and instruction files. Each of them receives your real tools and permissions, and any of them can hide a malicious instruction. BAS Guard statically scans those artifacts on your machine and produces a risk report with cleanup suggestions.

## Highlights

- **Local and offline.** It never executes the content it scans, makes no network calls and uploads nothing. The one exception is the optional LLM check: when you turn it on with `--llm`, redacted excerpts are sent to the endpoint you configured.
- **Read-only by default.** `scan` and `check` only read. `clean` is the only command that writes, and it only moves files into a trash directory inside your config root. It never deletes.
- **Single binary.** Pure Go, with no runtime dependencies.
- **Ten detection dimensions.** Injection, excessive permissions, data exfiltration, code execution, supply chain, obfuscation, backdoor, resource abuse, filesystem and intent mismatch. Intent judging is an optional LLM enhancement that is off by default.
- **Permission audit.** Inline secrets, wildcard command execution, over-broad paths and missing deny rules.
- **Load-time gate.** Registered as a Claude Code hook, it audits a skill before an agent loads it and asks you about anything that carries a finding.
- **Privacy.** Secret values are redacted before the report is built, so raw credentials never reach the output.

## What it scans

- Skills, including their scripts and resources
- MCP server configuration at user, local and project scope
- Hooks and helper commands in `settings.json`
- Permission allowlists
- Subagents and slash commands
- Installed plugins
- Instruction files such as `CLAUDE.md`
- Agent-shaped items in your downloads folder, reported separately because they are not installed yet

## Capability boundary

BAS Guard is a static scanner. Treat it as a health check with alerting and cleanup, not as a guarantee of removal. The score is a relative risk signal, not a safety certification. It cannot:

- prove malice; it reports a level of suspicion
- observe runtime behavior, such as remote second-stage payloads or conditional backdoors
- recover the intent of encrypted or heavily obfuscated payloads
- observe what an MCP endpoint actually does
- inspect the internals of dependencies
- catch unknown techniques

A clean report means that no known pattern was found in what the scan was able to read. When part of your setup could not be read, the report says that coverage is incomplete instead of calling the setup safe.

## Next steps

- [Install BAS Guard](./install.md)
- [Use BAS Guard](./usage.md)
- Source code and full rule reference: [github.com/basdotio/bas-guard](https://github.com/basdotio/bas-guard)
