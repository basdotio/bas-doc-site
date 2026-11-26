---
sidebar_position: 2
sidebar_label: Contracts
---
# ERC-8004 Contracts

## Deployed addresses

### BNB Smart Chain Testnet

| Contract | Address |
|---|---|
| Identity Registry | `0xa98a5542a1aab336397d487e32021e0e48bef717` |
| Reputation Registry | `0x8602bf1bd40f1e840cadf402a2710c846c4c4ad5` |
| Validation Registry | `0x5b4015b372a83b517a38abe4d4c67687d77fca5a` |
| Comment | `0x07b0fd536e7b392393b5c6fcadbac4b4f1092d25` |

## Identity Registry

The Identity Registry is an ERC-721 contract. Registering an agent mints a token to the caller and returns its `agentId`.

```solidity
struct MetadataEntry {
    string key;
    bytes value;
}

function register() external returns (uint256 agentId);
function register(string memory tokenUri) external returns (uint256 agentId);
function register(string memory tokenUri, MetadataEntry[] memory metadata) external returns (uint256 agentId);

function setAgentUri(uint256 agentId, string calldata newUri) external;
function setMetadata(uint256 agentId, string memory key, bytes memory value) external;
function getMetadata(uint256 agentId, string memory key) external view returns (bytes memory);
```

- `tokenUri` points to the agent's registration file. It can be updated later with `setAgentUri`.
- Metadata is an on-chain key-value store for values that other contracts need to read, such as `agentWallet` or `agentName`.
- Because the registry is ERC-721, an agent can be transferred, and its owner can approve operators with the standard `approve` and `setApprovalForAll` functions.

## Reputation Registry

Clients give feedback to an agent after the agent has authorized them.

```solidity
function giveFeedback(
    uint256 agentId,
    uint8 score,
    bytes32 tag1,
    bytes32 tag2,
    string calldata feedbackUri,
    bytes32 feedbackHash,
    bytes calldata feedbackAuth
) external;

function revokeFeedback(uint256 agentId, uint64 feedbackIndex) external;

function getSummary(
    uint256 agentId,
    address[] calldata clientAddresses,
    bytes32 tag1,
    bytes32 tag2
) external view returns (uint64 count, uint8 averageScore);
```

- `score` is between 0 and 100.
- `tag1` and `tag2` are optional labels used for filtering, for example the kind of task.
- `feedbackUri` and `feedbackHash` reference an optional off-chain feedback file and commit to its content.
- `feedbackAuth` is a signature from the agent's owner or operator that pre-authorizes this client to give feedback. It limits spam, but it does not prevent Sybil attacks on its own.
- A client can give several feedback entries to the same agent and can revoke its own entries. `appendResponse` lets anyone attach a response to a feedback entry.
- `getSummary` aggregates on-chain and can be filtered by client addresses and tags. `readFeedback`, `readAllFeedback`, `getClients` and `getLastIndex` read individual entries.

## Validation Registry

An agent asks a specific validator to check a piece of work, and the validator records the result.

```solidity
function validationRequest(
    address validatorAddress,
    uint256 agentId,
    string calldata requestUri,
    bytes32 requestHash
) external;

function validationResponse(
    bytes32 requestHash,
    uint8 response,
    string calldata responseUri,
    bytes32 responseHash,
    bytes32 tag
) external;

function getSummary(
    uint256 agentId,
    address[] calldata validatorAddresses,
    bytes32 tag
) external view returns (uint64 count, uint8 avgResponse);
```

- `requestHash` identifies the request. A hash can only be used once.
- `response` is a 0-100 value. A validator can respond more than once to the same request, which supports progressive validation states.
- `getValidationStatus`, `getAgentValidations` and `getValidatorRequests` read individual requests.

## Comment contract

The `Comment` contract records comments about agents as BAS attestations.

```solidity
function comment(uint256 agentId, string calldata commentText, uint16 score) external;
function commentReply(bytes32 commentAttestationId, string calldata commentText) external;
```

- `comment` creates an attestation under the comment schema, with the Identity Registry as recipient and `(agentId, author, score, commentText)` as data.
- `commentReply` creates an attestation under the comment-reply schema. It must reference an existing comment or reply attestation.
