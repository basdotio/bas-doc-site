---
sidebar_position: 6
---
# Resolver

A resolver lets a schema owner attach custom logic to attestations. Think of it as a gatekeeper: BAS calls the resolver every time an attestation is created or revoked under the schema, and the operation only goes through if the resolver approves it. Without a resolver, anyone can create any attestation under a schema. For example, anyone could create a "twitter record" claiming to be someone else.

## How a resolver works

A resolver is a separate smart contract that implements the `ISchemaResolver` interface. BAS calls it as a hook:

| Function | Called when | Returns |
|---|---|---|
| `attest(attestation)` | One attestation is created | `true` to accept it |
| `multiAttest(attestations, values)` | Several attestations are created in one transaction | `true` if all are accepted |
| `revoke(attestation)` | One attestation is revoked | `true` to allow the revocation |
| `multiRevoke(attestations, values)` | Several attestations are revoked in one transaction | `true` if all are allowed |
| `isPayable()` | BNB is sent along with the call | `true` if the resolver accepts BNB |

If the resolver returns `false` or reverts, the whole transaction reverts and nothing is recorded.

The resolver receives the full attestation record (schema, attester, recipient, expiration time, referenced UID and data), so its logic can depend on any of these. For example, only the owner of a certain NFT may attest, or the attester must pay some BNB first.

## How to use a resolver

A resolver is bound to a schema at registration time. When you create a schema, put the resolver contract address in the `resolver` field. Leave it as the zero address for a schema without a resolver. The resolver of an existing schema cannot be changed, because the resolver address is part of the schema UID.

## Practical examples

The [BAS contract repository](https://github.com/basdotio) ships a `SchemaResolver` base contract and several resolvers built on the same interface:

| Resolver | What it enforces |
|---|---|
| `AttestorResolver` | Only one designated attester address may attest. The owner can update that address. |
| `RecipientResolver` | Attestations must be made to one specific recipient. |
| `TokenResolver` | The attester must have approved a given amount of an ERC-20 token to the resolver. |
| `PayingResolver` | Pays the attester a fixed BNB incentive on attest and expects it back on revoke. |
| `PointReleaseResolver` | Charges a per-schema fee in BNB and optionally restricts each schema to one valid attester. Attestations under it cannot be revoked. |

🌐 **Tutorial**: [Leveraging Resolver Contracts](../tutorials/resolver.md)
