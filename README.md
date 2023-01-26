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
export PRIVATE_KEY=<Private key generated from anvil>
forge script script/TradeCentral.s.sol:TradeCentralScript --fork-url http://localhost:8545 \
--private-key $PRIVATE_KEY --broadcast
```

Create an .env.local file in the root directory and add the following

```console
NEXT_PUBLIC_ENABLE_ANVIL=true
NEXT_PUBLIC_CONTRACT_ADDRESS=<Your contract address, deployed to anvil>
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

Deploy the contract to goerli testnet:

```console
export RPC_URL=<Your RPC endpoint, get from Alchemy>
export PRIVATE_KEY=<Your wallets private key, get faucet from https://goerlifaucet.com/>
forge create NFT --rpc-url=$RPC_URL --private-key=$PRIVATE_KEY --constructor-args <name> <symbol>
```

### Project structure
  
```console
├── ./contracts/ (Foundry)
└── ./ (Next.js with Rainbowkit and TailwindCSS)
