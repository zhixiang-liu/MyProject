export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'a',
        type: 'int256',
      },
    ],
    name: 'add',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'hashString',
        type: 'string',
      },
    ],
    name: 'addHash',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'hashString',
        type: 'string',
      },
    ],
    name: 'ValueChanged',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getHashArray',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'hashArray',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
export const CONTRACT_ADDRESS = '0x47fD17F7664A0c58EF4c1479dbF58Df9f766F93b'
