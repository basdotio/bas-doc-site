---
sidebar_position: 1
---
# Schemas

A schema is a structured framework that defining the data format and resolver with `attest` function. Schema dictate what kind of data can be attested and how that data should be presented.

Here is an example for `bytes32 schemaId, string name`. It maps schemaUID(bytes32) to schema name (string).

<div align="center" id="Schema Detail">
    <img src="/figures/schema_detail.png" width="70%" />
</div>

## Fields in a schema is

- **`Schema #`** - An incrementally assigned number that is not a unique identifier.
- **`UID`** - A unique universal identifier exclusively assigned to the schema.
- **`Creator`** - The wallet address responsible for creating the schema.
- **`Transaction ID`** - The BNB Chain or opBNB transaction ID registering the schema on BAS.
- **`Resolver`** - An optional contract designated to the schema for more intricate use cases.
- **`Attestation Count`** - The total number of attestations, whether on or off-chain, associated with the schema.
- **`Schema`** - The ABI encoded field types within the schema.

🌐 **Tutorial**: [Make a Schema](../tutorials/create_schema.md)

## **Composability and Modularity**

Composability and modularity are key strengths of BAS, extending to its approach to schema design. Rather than crafting monolithic schemas that attempt to encompass everything, the emphasis lies in constructing smaller, modular schemas that can be flexibly combined.

### Example: Basic Profile

Account info in different could be different but there are some common basic info for example: name, age, avatar. Different account info schema can reuse the same basic profile schema.

## Naming and Describing Schemas

With BAS, you can use attestations to add more info to your schemas:

- [Naming a Schema](./composability.md#naming-a-schema--description-of-a-schema)
- [Add a Description](./composability.md#naming-a-schema--description-of-a-schema)