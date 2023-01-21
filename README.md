# Trade central
A FVM SPACE WARP ETHGLOBAL HACKATHON PROJECT

## Project description
TODO: Add project description

## Project structure
  
```console
├── contracts (Foundry contracts)
└── frontend (Next.js frontend, with React and TailwindCSS)
```

### Deploy foundry contracts

```console
cd contracts
forge create --rpc-url <your_rpc_url> \
    --constructor-args "ForgeUSD" "FUSD" 18 1000000000000000000000 \
    --private-key <your_private_key> \
    --etherscan-api-key <your_etherscan_api_key> \
    --verify \
    src/MyToken.sol:MyToken
```

### Deploy frontend
```console
cd frontend
yarn install
yarn deploy
```