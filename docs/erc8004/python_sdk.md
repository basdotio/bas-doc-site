---
sidebar_position: 3
sidebar_label: Python SDK
---
# ERC-8004 Python SDK

`erc8004-sdk` is a lightweight Python SDK that helps you:

- Register agent identities on ERC-8004 compatible contracts.
- Store agent profiles and feedback files on IPFS.
- Produce the EIP-191 signatures that authorize feedback.
- Give, respond to and revoke feedback.

## Requirements

- Python 3.9 or later
- An RPC endpoint for the target network
- Optional: an IPFS API endpoint, if you want the SDK to store profiles and files

## Installation

Install from source:

```bash
git clone https://github.com/bnb-attestation-service/erc8004-sdk-py.git
cd erc8004-sdk-py
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

## Create a client

```python
from erc8004_sdk import ERC8004Client

client = ERC8004Client(
    rpc_url="https://data-seed-prebsc-1-s1.bnbchain.org:8545",
    identity_contract_address="0xa98a5542a1aab336397d487e32021e0e48bef717",
    reputation_contract_address="0x8602bf1bd40f1e840cadf402a2710c846c4c4ad5",
    default_account="0xYourAccount",
    private_key="0xYourPrivateKey",
    ipfs_config={"ipfs_url": "http://127.0.0.1:5001"},
    auth_private_key="0xYourAuthSigningKey",
)
```

The addresses above are the BNB Smart Chain Testnet deployments. See [Contracts](./contracts.md#deployed-addresses) for the full list.

:::caution
Load private keys from environment variables or a secret manager. Never commit them to source control, and test on testnet before using mainnet.
:::

## Register an agent

```python
result = client.register_agent(
    token_uri="ipfs://placeholder",
    metadata=[
        {"key": "name", "value": "Sample Agent"},
        {"key": "data", "value": "0x1234"},
    ],
)
agent_id = result.agent_id or 0
```

`register_minimal()` and `register_with_uri()` cover the other two registration variants of the Identity Registry.

## Publish the agent profile

Store the registration file on IPFS and point the agent's token URI to it:

```python
from erc8004_sdk.types import AgentProfile

profile_uri = client.store_agent_profile(
    AgentProfile(
        name="Sample Agent",
        description="Always-on helper",
        image="https://example.com/agent.png",
        endpoints=[{"name": "A2A", "endpoint": "https://example.com/agent.json"}],
        registrations=[
            {"agentId": agent_id, "agentRegistry": f"eip155:97:{client.contract_address}"},
        ],
        supported_trust=["reputation"],
    )
)
client.set_agent_uri(agent_id=agent_id, new_uri=profile_uri)
```

The stored file lists the entries of `endpoints` under `services`, the name used by the current ERC-8004 registration format, and repeats them under `endpoints` for readers of the earlier draft. Set `image` if you want the profile to pass the [agent evaluation](./agent_evaluation.md) schema check, which requires it.

## Authorize and give feedback

Feedback involves two accounts. The Reputation Registry rejects feedback sent by the agent's own owner, and the authorization must name the account that submits the feedback. In the snippets below, `client` is the agent owner from the previous steps and `reviewer_client` is a second `ERC8004Client` created with the reviewer's account and key.

The agent owner signs a feedback authorization for the reviewer:

```python
import time

reviewer_address = "0xReviewerAccount"

feedback_auth = client.build_feedback_auth(
    agent_id=agent_id,
    client_address=reviewer_address,
    index_limit=client.get_last_index(agent_id, reviewer_address) + 1,
    expiry=int(time.time()) + 3600,
    chain_id=97,
    identity_registry=client.contract_address,
).hex()
```

The reviewer then submits feedback with that authorization:

```python
reviewer_client.give_feedback(
    agent_id=agent_id,
    score=90,
    tag1="customer_support",
    tag2="satisfaction",
    feedback_uri="ipfs://feedback",
    feedback_hash="0x" + "ab" * 32,
    feedback_auth=feedback_auth,
)
```

## Other operations

| Method | Purpose |
|---|---|
| `set_metadata` | Write an on-chain metadata entry for an agent |
| `append_response` | Attach a response to a feedback entry |
| `revoke_feedback` | Revoke a feedback entry you gave |
| `get_last_index` | Read the last feedback index of a client for an agent |
| `approve`, `set_approval_for_all` | Delegate control of an agent to an operator |
| `store_json`, `store_file` | Store arbitrary data on IPFS |
| `wait_for_receipt` | Wait for a transaction to be mined |

## Run the full example

The repository includes an end-to-end reputation workflow in `examples/reputation_workflow.py`. It needs `python-dotenv`, which is part of the `dev` extra:

```bash
pip install -e ".[dev]"
```

The example reads its configuration from a `.env` file in the project root:

```bash
RPC_URL=https://data-seed-prebsc-1-s1.bnbchain.org:8545
IDENTITY_CONTRACT_ADDRESS=0xYourIdentityRegistryAddress
REPUTATION_CONTRACT_ADDRESS=0xYourReputationRegistryAddress

# Agent owner
BOB_PRIVATE_KEY=0xYourBobPrivateKey
BOB_ADDRESS=0xYourBobAddress

# Feedback provider
ALICE_PRIVATE_KEY=0xYourAlicePrivateKey
ALICE_ADDRESS=0xYourAliceAddress

CHAIN_ID=97

# Optional; defaults to a local IPFS daemon
IPFS_API_URL=http://127.0.0.1:5001
```

```bash
python examples/reputation_workflow.py
```
