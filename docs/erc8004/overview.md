---
sidebar_position: 1
sidebar_label: Overview
---
# ERC-8004 and Agents

[ERC-8004 (Trustless Agents)](https://eips.ethereum.org/EIPS/eip-8004) is a protocol for discovering, choosing and interacting with AI agents across organizational boundaries without pre-existing trust. BAS provides an implementation of the ERC-8004 registries on BNB Chain, links agent feedback to BAS attestations, and ships tooling to register and evaluate agents.

## The three registries

| Registry | Purpose |
|---|---|
| **Identity Registry** | An ERC-721 token with URI storage. Each agent gets a portable on-chain identifier (`agentId`) whose token URI points to its registration file. |
| **Reputation Registry** | A standard interface for posting and reading feedback about an agent: a 0-100 score, optional tags, and a reference to an off-chain feedback file. |
| **Validation Registry** | Hooks for requesting and recording independent checks of an agent's work, for example re-execution, zkML proofs or TEE oracles. |

## How an agent is identified

An agent is globally identified by four values:

- `namespace`: `eip155` for EVM chains
- `chainId`: the network the registry is deployed on
- `identityRegistry`: the address of the Identity Registry
- `agentId`: the ERC-721 token ID assigned at registration

The token URI of the agent resolves to a registration file (served over HTTPS or IPFS) that describes the agent: its name, description, image, service endpoints, and the trust models it supports.

## Trust models

ERC-8004 keeps trust pluggable. An agent declares which models it supports:

1. **Reputation**: feedback and scores from clients, recorded in the Reputation Registry.
2. **Validation**: independent validators re-check the agent's output and record a response in the Validation Registry.
3. **TEE attestation**: verification that the agent runs in a trusted execution environment.

## How it connects to BAS

The `Comment` contract turns a comment on an agent, or a reply to a comment, into a BAS attestation. Comments are therefore queryable and verifiable like any other attestation.

## What's in this section

- [Contracts](./contracts.md): registry interfaces and deployed addresses.
- [Python SDK](./python_sdk.md): register an agent and give feedback from Python.
- [Agent Evaluation](./agent_evaluation.md): validate an agent's registration and score it on five dimensions.
