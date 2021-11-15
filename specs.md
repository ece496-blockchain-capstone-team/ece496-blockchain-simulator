# Classes

## Block
Representing a single block on the blockchain.

### Fields
- Block data (e.g. transactions)
- Hash
- Valid
- Data size
- Identifier
- Hash of previous block

## Chain
Represents an iteration of the blockchain.

### Fields
- Identifier
- Blocks (list or last block)
- Valid (if whole chain is valid or not)
- Last updated
- Number of blocks
- Size (aggregated data size of all blocks)

## Location
Represents a physical location (e.g. server farm).

### Fields
- Identifier
- Name
- Coordinates/geolocation

## Host
Represents a singular machine at a location.

### Fields
- Identifier
- Name
- Stake
- Role (general, validator)
- Type (is malicious or not)
- Location ids
- Connection ids
- Last validation time
- Last updated time
- Last action time
- Validation probability (if validator)
- Chain (copy of the chain it has)

### Functions
- Validate block

## Connection
Represents a connection from one host to another.

### Fields
- Identifier
- Host ids
- Propagation time/bitrate

## Network
Represents the entire blockchain network.

### Fields
- Hosts
- Connections
- Settings
  - Stake deposit
  - Validator selection algo
  - Malicious behavior
  - Anti-malicious algo
  - Maximum block data size
