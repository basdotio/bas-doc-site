---
sidebar_position: 3
---
# Attestation

BAS provides a convenient method for creating attestations without any code or development skills required. All you need is a wallet.

## Find the Attestation

Users can find an attestation by UID in search box.

<div align="center" id="search attestation">
    <img src="/figures/search_attestation.png" width="60%" />
</div>

## Make an Attestation

1. **Find the Schema:** At the first step, You’re supposed to find out the schema you want to attest with. User can create an attestation in schema detail page or search the schema you want directly.

<div align="center" id="search schema">
    <img src="/figures/search_schema.png" width="60%" />
</div>

2. **Fill in the Attestation Record:** Specify the recipient (optional), and then fill in each field specified by the schema.

<div align="center" id="create attestation1">
    <img src="/figures/create_attetation_1.png" width="60%" />
</div>

3. **Additional Options:** This section will allow you to do a few special things:

   1. Add an `expiration time`. Which sets a specific time when the attestation will expire.
   2. Add a `Referenced Attestation UID`. This allows you to build **[modular and composable attestations](https://docs.attest.sh/docs/core--concepts/composability)**.

   <div align="center" id="create attestation2">
       <img src="/figures/create_attetation_2.png" width="60%" />
   </div>

4. **On-chain v.s. Off-chain:** Decide to make the attestation on-chain or off-chain. And when user choose to create an off-chain attestation and store in Greenfield, he can set the visibility as public so that anyone can access to it or private so that only the authorized people can view.

<div align="center" id="public|private">
    <img src="/figures/public|private.png" width="60%" />
</div>

5. Once you finish the previous steps, click the “Make Attestation”. Then you can get your attestation for the target schema.

## Revoke an Attestation

User can revoke the attestations they want in the attestation detail page. When the attestation is revoked, it would be invalid.

<div align="center" id="revoke">
    <img src="/figures/revoking.png" width="65%" />
</div>

## Public/Privatize the Off-chain Attestation

After a user create an off-chain attestation and store it in greenfield, he can change the visibility in attestation detail page.

<div align="center" id="public attestation">
    <img src="/figures/public.png" width="65%" />
</div>

## Share Private Attestations

A private off-chain attestation stays readable only by its owner until the owner grants read permission on the Greenfield bucket that stores it. See [Manage Attestation in Greenfield](../manage%20attestation%20in%20greenfield%20on%20BNB%20Chain/manage_attestation_in_gf_on_contract.md#create-policy) for how to grant that permission through the manager contract.
