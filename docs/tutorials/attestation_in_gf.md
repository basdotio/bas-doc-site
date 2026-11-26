---
sidebar_position: 4
---
# Attestation with Greenfield

## Publish & Privatize Attestations

### Use [BASCAN](https://bascan.io)

Users can public or privatize the attestations they create on attestations detail page.

<div align="center" id="public">
    <img src="/figures/public.png" width="70%" />
</div>

### Use SDK

Developers can change visibility of attestations on GreenField through JS SDK. [See more detail](../sdk/js.md#change-visibility-of-attestations-on-greenfield).

## Share Private Attestations

To let another address read a private attestation, grant it read permission on the Greenfield bucket that stores the attestation. The manager contract on BNB Chain does this with `createPolicy`, without switching to the Greenfield network. See [Manage Attestation in Greenfield](../manage%20attestation%20in%20greenfield%20on%20BNB%20Chain/manage_attestation_in_gf_on_contract.md#create-policy).
