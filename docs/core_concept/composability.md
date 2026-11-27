---
sidebar_position: 3
---
# Composability

Composability is an important feature of Web3. Developers can create their own elements. And others can construct more complex and intricate structure by combing existing basic elements. Just like LEGO, users can build anything using several existing basic pieces.

## How to compose attestations

User can use the `refUID` field to reference to another attestation. This help users to reuse existing attestations and create  more complex structure.

## Examples


### Naming a schema & Description of a schema

In [BASCAN](https://bascan.io/), creator of a schema can set the name and description of a schema. There are two kind of schemas called "Naming a schema" and 
"Description of a schema" with the schema string "name string, uid bytes32" and "description string, uid bytes32" respectively. Where uid is the 
uid of some schema. When we set a schema `0x2333...2233` name as "GM", we create an "Naming a schema" attestation with data 
```json
{
  "name": "GM",
  "uid": "0x2333...2233"
}
```
The same goes for descriptions.

### Compose different basic account attestation into more detail account info

<div align="center" id="basic profile">
    <img src="/figures/profile.png" width="60%" />
</div>


Twitter record attestation and record attestation can reference an existing KYC attestation to give more information.

### Decentralized Social Media

Another use case is for social media platform. Bob can create a “post” attestation with uid 0x233…2233 representing his post. Alice can create a “like” attestation and a “comment” reference to  0x233…2233 respectively, representing Alice’s like and comment to Bob’s post. Meanwhile, Anne also can create a “comment” attestation referencing to Alice’s comment as Anne’s recommend to Alice’s comment.

<div align="center" id="social media">
    <img src="/figures/socoal_media.png" width="60%" />
</div>

Developers can compose any structure according to the remands.
