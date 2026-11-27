---
sidebar_position: 4
sidebar_label: Agent Evaluation
---
# Agent Evaluation

BAS Agent Visitor (`bas_agent_eval`) is an evaluation toolkit for agents registered in an ERC-8004 Identity Registry. Given an `agentId`, it:

1. Reads the `tokenURI` from the Identity Registry.
2. Resolves the registration document over HTTPS, IPFS or a data URI. Plain `http://` URIs are rejected.
3. Validates the document against the ERC-8004 registration schema.
4. Scores the agent on five dimensions and computes a reputation score.
5. Produces a reproducible JSON report.

## Installation

Install from a source checkout of the toolkit. It requires Python 3.10 or later.

```bash
cd agent_visitor
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

## Quick start

```python
from bas_agent_eval.api import evaluate_agent

result = evaluate_agent(
    agent_id=42,
    contract="0xYourIdentityRegistry",
    rpc="https://your-rpc-endpoint",
)

if result.valid:
    print(f"Reputation: {result.reputation_score}")
    print(f"Protocol: {result.protocol_score}")
    print(f"Availability: {result.availability_score}")
    print(f"Execution: {result.execution_score}")
    print(f"Capability: {result.capability_score}")
    print(f"Security: {result.security_score}")
```

### Parameters

| Parameter | Required | Default | Description |
|---|---|---|---|
| `agent_id` | Yes | - | ERC-721 token ID of the agent |
| `contract` | Yes | - | Identity Registry contract address |
| `rpc` | Yes | - | RPC URL of the network |
| `output_dir` | No | current directory | Output directory for local storage. It must already exist. |
| `storage` | No | `"local"` | Where to store the report: `"none"` (do not persist it), `"local"`, `"s3"` or `"ipfs"` |
| `s3_bucket`, `s3_prefix` | No | from environment | Target for `storage="s3"` |
| `ipfs_api_url`, `ipfs_gateway_url` | No | from environment | Target for `storage="ipfs"` |

### Evaluate from a registration URI

If you already have the URL of the agent's registration document, skip the on-chain lookup:

```python
from bas_agent_eval.sdk import SDK

sdk = SDK()
report = sdk.validate_agent_with_uri(
    agent_id=42,
    agent_uri="https://example.com/agent.json",
    storage="local",
)
print(report.report_uri)
```

`SDK.validate_agent()` takes the same `agent_id`, `contract` and `rpc` arguments as `evaluate_agent()` and returns a `JSONReport`. Its default `storage` is `"none"`, so pass `storage` to keep the report.

## Command line

```bash
# Validate and evaluate one agent, storing the report locally.
# The output directory must exist.
mkdir -p reports
bas-eval validate 42 \
    --contract 0xYourIdentityRegistry \
    --rpc https://your-rpc-endpoint \
    --output-dir ./reports

# Evaluate without writing a report
bas-eval validate 42 --contract 0x... --rpc https://... --storage none

# Evaluate a range of agents
bas-eval-batch --start-id 1 --end-id 100 \
    --contract 0x... \
    --rpc https://... \
    --output batch_results.json

# Inspect evaluation logs
bas-eval logs show --errors
bas-eval logs show --days 7
```

Pass `--storage s3 --s3-bucket <bucket> --s3-prefix <prefix>` or `--storage ipfs` to store reports remotely.

## Scoring

The reputation score is a weighted sum of five dimension scores, each between 0 and 100:

| Dimension | Weight | What it measures |
|---|---|---|
| **Protocol** | 0.25 | ERC-8004 schema compliance of the registration document |
| **Availability** | 0.20 | Whether the declared HTTPS endpoints answer HEAD/GET probes, and how fast |
| **Execution** | 0.30 | Whether the endpoints answer a `bas_test=ping` probe with a valid pong |
| **Capability** | 0.15 | Completeness and structure of the declared capabilities and services |
| **Security** | 0.10 | HTTPS, authentication, rate limiting and CORS on the services |

```
reputation = 0.25 * protocol + 0.20 * availability + 0.30 * execution
           + 0.15 * capability + 0.10 * security
```

How each dimension is scored:

- **Protocol**: 100 for a registration document that passes schema validation. A document that fails validation is not scored on any dimension.
- **Availability**: `success_rate * avg_latency_factor * 100`. The latency factor is 1.0 up to 2 seconds, 0.5 between 2 and 5 seconds, and 0.25 above 5 seconds.
- **Execution**: based on the success rate and latency of the `bas_test=ping` probe. The response must be valid JSON containing a `pong` or `ok` field.
- **Capability**: 50 points for a non-empty `capabilities` array, 50 points for a non-empty `services` array with endpoints, minus 10 points for each unstructured capability item.
- **Security**: 25 points each for all services using HTTPS, any service declaring authentication, any service declaring rate limiting, and any service with proper CORS.

:::note
The score is a relative signal computed from what an agent declares and how its endpoints respond at evaluation time. It is not a security audit or a guarantee of behavior.
:::

## Report format

```json
{
  "version": "1.0",
  "metadata": {
    "agent_id": 42,
    "contract": "0x...",
    "rpc": "https://...",
    "timestamp": "2026-03-30T10:00:00Z",
    "status": "evaluated"
  },
  "validation": {
    "valid": true,
    "uri": "ipfs://Qm...",
    "field_presence": {
      "present": ["type", "name", "description", "image", "services", "registrations"],
      "missing": [],
      "invalid": []
    },
    "errors": []
  },
  "evaluation": {
    "reputation_score": 90.0,
    "dimensions": {
      "protocol": { "score": 100.0, "passed": true, "error_count": 0 },
      "availability": { "score": 100.0, "passed": true, "endpoints_tested": 2, "successful": 2, "success_rate": 1.0, "endpoints": [] },
      "execution": { "score": 75.0, "passed": true, "endpoints_tested": 2, "successful": 2, "success_rate": 1.0, "endpoints": [] },
      "capability": { "score": 100.0, "passed": true, "details": { "capabilities_count": 3, "services_count": 2, "unstructured_count": 0 } },
      "security": { "score": 75.0, "passed": true, "details": { "services_tested": 2, "https_services": 2, "auth_enabled": 1, "rate_limited": 1, "cors_ok": 0 } }
    }
  }
}
```

`status` is `"validation_only"` when the registration document fails validation. In that case no dimension is scored and the report has no `evaluation` section. Otherwise `status` is `"evaluated"`. A dimension passes at a score of 60 or more. The per-endpoint results under `endpoints` and the `details` objects are shortened here. The full report also contains the raw registration document and a probe log for the availability and execution checks.
