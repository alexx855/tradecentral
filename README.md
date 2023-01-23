# Trade central
FVM Space Warp EthGlobal Hackathon project

## Project description
A decentralized marketplace where you can buy and sell real-life products securely using Filecoin's FVM & Lighthouse. Shop in a decentralized way on Trade central.

## How to Run
Pull the submodules
```console
git pull --recurse-submodules
```
Install dependencies and run the development server
```console
npm install
npm run dev
```
Open http://localhost:3000 to view it in your browser.

## Foundry Contracts
Install foundry-cli
```console
curl -L https://foundry.paradigm.xyz | bash
```
Test the contracts
```console
cd contracts
forge test -vv
``` 

### Project structure
  
```console
├── ./contracts/ (Foundry)
└── ./ (Next.js with Rainbowkit and TailwindCSS)
