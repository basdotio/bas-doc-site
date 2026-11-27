---
sidebar_position: 3
sidebar_label: Usage
---
# Use BAS Guard

## Check one artifact before installing it

`check` statically scans a single skill, directory, file or downloaded archive. Its answer does not depend on the machine it runs on, which makes it the command to start with.

```bash
bas-guard check ./some-skill
bas-guard check foo.zip
```

`check` runs in gate mode: it exits with code `1` when it finds something of high severity or above.

## Scan your whole setup

`scan` audits everything your agent loads from its config root, `~/.claude` by default.

```bash
bas-guard scan                      # full scan of ~/.claude
bas-guard scan --root ~/.claude     # specify the root
bas-guard scan --verbose            # also print coverage notes and the inventory
bas-guard scan --html report.html   # also write a self-contained HTML report
bas-guard scan --md report.md       # also write a markdown report
bas-guard scan --json               # machine-readable output
bas-guard scan --fail-on high       # exit 1 when a finding is high or above
```

`scan` is informational by default and does not exit non-zero on findings. Add `--fail-on <severity>` to use it as a gate in CI or a pre-commit hook.

Each finding comes with a next step: which file and line to read and, for a skill the load-time gate can stop, the exact `bas-guard approve` command.

### Exit codes

| Code | Meaning |
|---|---|
| `0` | No finding at or above the threshold |
| `1` | A finding at or above `--fail-on` |
| `2` | Runtime error |
| `3` | `clean` only: acted partially, with every refusal named |
| `4` | A gate could not be evaluated, for example the root held nothing to check. This is not a pass. |

## Clean up

`clean` lists junk and the tokens you could reclaim: duplicate skills, context bloat, stale references and unused skills.

```bash
bas-guard clean                     # list junk and reclaimable tokens (read-only)
bas-guard clean --zombie            # also look for never-used skills
bas-guard clean --zombie --apply    # move them to the trash directory
bas-guard clean --undo last         # put a batch back
bas-guard clean --ask               # answer duplicate pairs one at a time
```

The boundary of what `clean` does is narrow:

- **It never deletes.** Everything it acts on is moved into `<root>/.aguard-trash/`, and the move is recorded before it happens. `--undo` puts it back. Deleting stays your decision.
- **Only `skills/`.** Settings files, MCP configuration and anything under `hooks/` are never moved.
- **Quarantined content still scores.** Moving something into the trash does not improve your score. Only deleting it does.
- **Nothing is chosen for you.** A duplicate pair has no default survivor. You choose which side to keep.

## Load-time gate

`check` answers when you remember to ask. The gate answers at the moment a skill is about to be loaded.

```bash
bas-guard hook install              # merges into ~/.claude/settings.json and backs it up
bas-guard approve ./some-skill      # trust these exact bytes, so the gate stops asking
bas-guard approvals                 # list what has been trusted
```

Restart Claude Code after installing the gate. Approvals are keyed by a hash of the artifact's content, so editing an approved skill reopens the question automatically.

## Understand a finding

Every finding carries a rule ID, a dimension and a severity. The [rule reference](https://github.com/basdotio/bas-guard/blob/main/docs/rules.md) lists every rule ID the tool can print and why it fires. It is generated from the engine's own rule set, so the severity you read there is the severity that gates your build.

Some findings are labeled as advisory. Backdoor and resource-abuse hits, and credential-to-network pairs that span several files, are patterns worth reading rather than verdicts.
