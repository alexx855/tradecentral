# Trade central

FVM Space Warp EthGlobal Hackathon project

## Project description

A decentralized marketplace where you can buy and sell real-life products securely using Filecoin's FVM & Lighthouse. Shop in a decentralized way on Trade central.

### How to get started locally

Pull the submodules

```console
git pull --recurse-submodules
```

Spin up the local anvil node

```console
cd contracts
anvil
```

Deploy the contract to the local node:

```console
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
cd contracts
forge script script/TradeCentral.s.sol:TradeCentralScript --fork-url http://127.0.0.1:8545 --private-key $PRIVATE_KEY --broadcast
```

Create an .env.local file in the root directory and add the following

```console
NEXT_PUBLIC_ENABLE_ANVIL=true
NEXT_PUBLIC_CONTRACT_ADDRESS=<Your contract address, deployed to anvil>
NEXT_PUBLIC_CHAIN_ID=1337
```

Install dependencies and run the development server

```console
npm install
npm run dev
```

Open <http://localhost:3000> to view it in your browser.

### Foundry Contracts

Test the contracts

```console
cd contracts
forge test -vv
```

Build and compile the ABIs:

```console
forge build
```

Get the ABIs from the contracts/out folder

```console
contracts/out/TradeCentral.sol/TradeCentral.json
```

Deploy the contract to goerli testnet:

```console
export PRIVATE_KEY=<Private key with founds on the goeril network>
export GOERLI_RPC_URL=https://eth-goerli.g.alchemy.com/v2/ussRf9HYqcYBRlAJfGww5-HNF2gGS3oN
export ETHERSCAN_API_KEY=FTS9SQ5P7K31STQ5V5YTCJ68R6IZFGWBXN
forge script script/TradeCentral.s.sol:TradeCentralScript --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY  -vvvv
```

### Hardhat Scripts

Script to deploy dummy data to the contract

```console
cd hardhat
npx hardhat run deploy.ts --network localhost
npx hardhat run deploy.ts --network goeril
```

### Project structure
  
```console
├── ./contracts/ (Foundry)
└── ./ (Next.js with Rainbowkit and TailwindCSS)
