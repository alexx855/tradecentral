import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env.local' })

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
