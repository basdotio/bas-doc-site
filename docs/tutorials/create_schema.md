---
sidebar_position: 1
---
# Create a Schema

## Instruction to schema

- In the BNB Attestation Service (BAS), a schema defines the data structure for attestations. These schemas are customizable and can be created for various purposes, enabling users to utilize existing schemas or generate new ones tailored to their specific needs.

- BAS uses BNB smart contract to register schemas and verify corresponding attestations. The registered schemas can be founded on [BASCAN](https://bascan.io).

- [BASCAN](https://bascan.io) provides a concise and clear way for users to engage with schemas and attestations. Remember to check whether the schema you intend to create already exists before proceeding, as BAS encourages the reuse of existing schemas to create greater data value.

## The fields in a schema

- Structures adhere to the Solidity ABI for permissible types. The following enumerates the existing fundamental types:
  - **`address`**: An address, which may represent any BNB address or contract address.
  - **`string`**: A string, accommodating text of arbitrary length.
  - **`bool`**: A boolean value, capable of being either true or false.
  - **`bytes32`**: A 32-byte value, beneficial for unique identifiers or small data.
  - **`bytes`**: An arbitrary byte value.
  - **`uints`**: Unsigned integer values, ranging from **`uint8`** to **`uint256`**.
  - **`<type>[]`**: A variable-length array comprising elements of the specified type.
- Learn more about valid types : [Sol ABI Types](https://docs.soliditylang.org/en/v0.8.16/abi-spec.html).

## Understanding the Schema Record

- The attributes of each schema record include the following:
  - **`Schema #`** - An incrementally assigned number that is not a unique identifier.
  - **`UID`** - A unique universal identifier exclusively assigned to the schema.
  - **`Creator`** - The wallet address responsible for creating the schema.
  - **`Transaction ID`** - The BNB/OpBNB transaction ID registering the schema on BAS.
  - **`Resolver`** - An optional contract designated to the schema for more intricate use cases.
  - **`Attestation Count`** - The total number of attestations, whether on or off-chain, associated with the schema.
  - **`Schema`** - The ABI encoded field types within the schema.
- An example schema record on BASCAN:

<div align="center" id="schema_detail">
    <img src="/figures/schema_detail.png" width="80%" />
</div>

## Create Schemas

### Create a Schema by [BASCAN](https://bascan.io)

BASCAN provide an easy way for everyone to create a schema record without code. Learn more information at [BASCAN](https://bascan.io).

<div align="center" id="revoke">
    <img src="/figures/create_schema.png" width="80%" />
</div>

Users can get more detail in [here](../explorer/schema.md#create-a-schema)

### Create a schema by sdk

Users can find out how to create a schema using SDK [here](../sdk/js.md#registering-a-schema).
