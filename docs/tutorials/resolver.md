---
sidebar_position: 5
---
# Leveraging Resolver Contracts

Resolver contracts are hooks that BAS calls before an attestation or revocation is finalized. They let you add smart contract logic to a schema, such as an allow-list of attesters, a fee, or a token check. See [Resolver](../core_concept/resolver.md) for the concept.

## Conceptual Framework

A resolver is attached at the schema level. Every attestation made under that schema, and every revocation, is passed to the resolver first. If the resolver returns `false` or reverts, BAS rejects the operation.

## Write a resolver

The simplest way is to inherit from the `SchemaResolver` base contract and implement two callbacks:

- `onAttest(attestation, value)`: return `true` to accept a new attestation.
- `onRevoke(attestation, value)`: return `true` to allow a revocation.

`value` is the amount of BNB sent with the call. The base contract already checks that the caller is the BAS contract, handles batched calls, and rejects BNB unless you override `isPayable()` to return `true`.

### Example: restrict the recipient

This resolver only accepts attestations made to one specific recipient:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { SchemaResolver } from "../SchemaResolver.sol";
import { IEAS, Attestation } from "../../IEAS.sol";

contract RecipientResolver is SchemaResolver {
    address private immutable _targetRecipient;

    constructor(IEAS eas, address targetRecipient) SchemaResolver(eas) {
        _targetRecipient = targetRecipient;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal view override returns (bool) {
        return attestation.recipient == _targetRecipient;
    }

    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true;
    }
}
```

### Example: require a token allowance

This resolver only accepts an attestation if the attester has approved a given amount of an ERC-20 token to the resolver:

```solidity
contract TokenResolver is SchemaResolver {
    error InvalidAllowance();

    IERC20 private immutable _targetToken;
    uint256 private immutable _targetAmount;

    constructor(IEAS eas, IERC20 targetToken, uint256 targetAmount) SchemaResolver(eas) {
        _targetToken = targetToken;
        _targetAmount = targetAmount;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal view override returns (bool) {
        if (_targetToken.allowance(attestation.attester, address(this)) < _targetAmount) {
            revert InvalidAllowance();
        }
        return true;
    }

    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true;
    }
}
```

## Deploy and attach the resolver

1. Deploy the resolver, passing the BAS contract address of the target network to the constructor. The addresses are listed in [Quick Start](../quick_start.md#contracts).
2. Register a schema with the resolver address in the `resolver` field, either on [BASCAN](https://bascan.io) or through the [JS SDK](../sdk/js.md#registering-a-schema).
3. Make an attestation under the schema. One that breaks the resolver rule reverts; one that satisfies it is recorded as usual.

:::note
A resolver is fixed when the schema is registered. To change the logic later, register a new schema with a new resolver, or make the resolver itself configurable, as `AttestorResolver` does with `updateTargetAttester`.
:::
