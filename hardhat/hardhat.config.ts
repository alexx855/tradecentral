import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv'

// check if the network is localhost from the process.argv  --network localhost
const isLocalhost = process.argv.includes('--network') && process.argv[process.argv.indexOf('--network') + 1] === 'localhost';
dotenv.config({ path: isLocalhost ? '../.env.local' : '../.env' })

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      chainId: 1337,
      url: `http://localhost:8545`,
      accounts: [process.env.DEPLOYER_ACCOUNT!, ...process.env.USERS_PRIVATE_KEYS!.split(',')]
    },
    goeril: {
      chainId: 5,
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      accounts: [process.env.DEPLOYER_ACCOUNT!, ...process.env.USERS_PRIVATE_KEYS!.split(',')]
    }
  }
};

export default config;
