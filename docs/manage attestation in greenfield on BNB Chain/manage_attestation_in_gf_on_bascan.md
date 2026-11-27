---
slug: manger_attestation_in_gf_on_bascan
---
# Manage off-chain attestations on BASCAN

Users can manage their off-chain attestations on BASCAN from BNB Chain, without switching networks.

## Create Manager Contract

If users don't have a manager contract, they should create one.

<div align="center">
    <img src="/figures/deploy_manager.png" width="70%" />
</div>

## Create General Bucket with Tag 'bascan'

If users don't have a bucket where store the off chain attestation created on BASCAN, they should create one.

<div align="center">
    <img src="/figures/create_bucket.png" width="70%" />
</div>

## Grant upload and read permission to BASCAN

After create a bascan bucket, users should grant the upload and read permission to BASCAN so that BASCAN can be delegated to upload off-chain attestation to Greenfield.

<div align="center">
    <img src="/figures/grant_permission.png" width="70%" />
</div>

## Delegate to upload off chain attestation to Greenfield

After finished all above actions, when users create a off chain attestation and send it to BASCAN. BASCAN will upload it to Greenfield.

<div align="center">
    <img src="/figures/create_off_chain_att.png" width="70%" />
</div>

Then you can view the off chain attestation on BASCAN.

<div align="center">
    <img src="/figures/created_off_chain_success.png" width="70%" />
</div>