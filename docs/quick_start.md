---
sidebar_position: 2
sidebar_label: Quick Start
---
# Quick Start

## How does BAS work

On BAS, firstly user should register a [schema](./core_concept/schema.md) in Schema Registry Contract. Schema defines a data structure including fields [revokable](./core_concept/revocation.md) and [resolver](./core_concept/resolver.md).

Then you can create an on-chain attestation based on one schema. And if the resolver field of the schema your attestation related to if not null, the BAS contract will call the resolver and check the validity of the attestation. After passing the verification, the new created
attesetation would be recorded in BAS contract.

Or you can create an off-chain attestation and store it in Greenfield or any other storage.

<div align="center">
<img src="/figures/work_flow.jpg" width="75%" />
</div>

Either on-chain or off-chain attestation could be claimed as invalid by the attestor through revoking it.  

## Contracts

The following contracts are deployed on BNB Chain and opBNB.

### BNB Mainnet

- BAS contract: `0x247Fe62d887bc9410c3848DF2f322e52DA9a51bC`
- Schema Registry contract: `0x5e905F77f59491F03eBB78c204986aaDEB0C6bDa`
- Delegate contract: `0x01dAc45529a070Cb67Fc5B328a7eBE394644355B`

### BNB Testnet

- BAS contract: `0x6c2270298b1e6046898a322acB3Cbad6F99f7CBD`
- Schema Registry contract: `0x08C8b8417313fF130526862f90cd822B55002D72`
- Delegate contract: `0x3b32B97092f09Ad34E5766e239e4C2F76b0DEe43`

### opBNB Mainnet

- BAS contract: `0x5e905F77f59491F03eBB78c204986aaDEB0C6bDa`
- Schema Registry contract: `0x65CFBDf1EA0ACb7492Ecc1610cfBf79665DC631B`
- Delegate contract: `0x2F086b84b6840e902E1745A94DA648D61B0252B0`
- Indexer contract: `0x2DA65798a0BA6E5f2D457F4A99890843a7C02aFe`

### opBNB Testnet

- BAS contract: `0x5e905F77f59491F03eBB78c204986aaDEB0C6bDa`
- Schema Registry contract: `0x65CFBDf1EA0ACb7492Ecc1610cfBf79665DC631B`
- Delegate contract: `0x8F6b5B3FFf1899A1107a1338b176f54ab72f27B9`
- Indexer contract: `0x96Fd40E6EA6826b0336C8018D646a6255a58b618`
