---
sidebar_position: 2
---
# Make an Attestation

Depending on your requirements and level of technical expertise, there are multiple methods available for creating attestations on BAS:

- BAS SDK: Designed for developers who are building decentralized applications (D-apps) or integrating attestations into existing platforms.
- Direct Contract Interaction: For those who prefer maximum flexibility and are comfortable interacting directly with BNB smart contracts.
- BASCAN Website: The most user-friendly option for creating attestations without any coding required.

## Understanding the Attestation Record

Before we delve into the process of creating attestations, take a moment to understand the structure of an attestation record. Whenever an attestation is made using our platform, a unique attestation record is generated. This includes details such as the schema used, the attestor’s address, the recipient (if specified), the expiration time (if specified), and much more. Each attestation record consists of the following fields.

- **`UID`**- This is a universally unique identification number assigned to the attestation.
- **`Schema`**- The UID of the schema utilized to create the attestation.
- **`Attestor`** - The address responsible for making the attestation.
- **`Recipient`** - An optional recipient of the attestation (if specified).
- **`Expiration Time`**- An optional date indicating when the attestation will expire, if provided by the attestor.
- **`Revocation Time`**- The time at which the attestation was revoked, if applicable.
- **`refUID`** - An attestation that this particular attestation is referencing, if any.
- **`data`** - The ABI encoded data associated with the attestation.

## Example: On-Chain Attestation Record

Users can clearly view the structure of an on-chain attestation on [BASCAN](https://bascan.io).

<div align="center" id="attestation_detail">
    <img src="/figures/attestation_detail.png" width="80%" />
</div>

## Example: OffChain Attestation Record

Here's an off-chain attestation record. Unlike the on-chain record, this attestation is public, and the server is unaware of it. Users can share the attestation URL with others to decode the data or publish it to GreenField. Once published or pinned to GreenField, the status icon will switch to "public.”

<div align="center" id="offchain_attestation">
    <img src="/figures/offchain_attestation.png" width="80%" />
</div>


## Make  Attestations

### Make Attestations through [BASCAN](https://bascan.io)

For non-developers seeking to leverage attestations, BAS provides no-code tools. These interfaces enable you to easily generate attestations through visual interface. See more information in [BASCAN](https://bascan.io).
Users can get more details on [here](../explorer/attestation.md#make-an-attestation).

### Make Attestations through SDK

Users can find out how to create an on-chain attestation [here](../sdk/js.md#creating-on-chain-attestations)

### Contract

The BAS contract exposes `attest`, `multiAttest`, `attestByDelegation` and the matching `revoke` functions. The deployed addresses for each network are listed in [Quick Start](../quick_start.md#contracts), and the contract source is published under the [BAS GitHub organization](https://github.com/basdotio).
