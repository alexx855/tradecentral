import { ethers } from "hardhat";
import { randCountry, randEmail, randFullName, randNumber, randProductCategory, randProductDescription, randProductName } from '@ngneat/falso';
import fs from 'node:fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../.env.local' })

async function main() {
  // deployer account, with founds on the network
  const deployerWallet = new ethers.Wallet(process.env.DEPLOYER_ACCOUNT!, ethers.provider);
  // print then deployer address and balance
  const deployerBalance = await deployerWallet.getBalance();
  console.log(`Deployer ${deployerWallet.address} has a balance of ${ethers.utils.formatEther(deployerBalance)}`);

  // We get the users private keys from the environment variable USERS_PRIVATE_KEYS, split them by comma and convert them to an array of strings
  const usersPrivateKeys = process.env.USERS_PRIVATE_KEYS!.split(',');
  const usersWallets = usersPrivateKeys.map((privateKey) => {
    return new ethers.Wallet(privateKey, ethers.provider);
  });

  // Print the addresses of the users and their balances
  for (const userWallet of usersWallets) {
    const balance = await userWallet.getBalance();
    console.log(`User ${userWallet.address} has a balance of ${ethers.utils.formatEther(balance)}`);
    // if the user has no balance, we send him some ether from the deployer account
    if (balance.isZero()) {
      const tx = await deployerWallet.sendTransaction({
        to: userWallet.address, value: ethers.utils.parseEther(process.env.NEXT_PUBLIC_CHAIN_ID !== '1337' ? '0.05' : '10')
      });
      const receipt = await tx.wait();
      console.log(`Sent some ether to ${userWallet.address} at block ${receipt.blockNumber}`);
    }
  }

  // We get the deployed contract's by address from the environment variable NEXT_PUBLIC_CONTRACT_ADDRESS
  // load the abi from the contract's build folder at ../contracts/out/TradeCentral.sol/TradeCentral.json
  const abi = JSON.parse(fs.readFileSync('../contracts/out/TradeCentral.sol/TradeCentral.json', 'utf8')).abi;
  const TradeCentral = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, abi, ethers.provider)
  console.log(`TradeCentral contract address: ${TradeCentral.address}`);

  // print the total users on the contract
  const contractWithDeployerWallet = TradeCentral.connect(deployerWallet);
  const totalTrades = await contractWithDeployerWallet.currentTrade();
  const totalUsers = await contractWithDeployerWallet.currentUser();
  console.log(`Total trades on the contract: ${totalTrades}`);
  console.log(`Total users on the contract: ${totalUsers}`);

  if (totalUsers.isZero()) {
    // Create the users' accounts on the TradeCentral contract
    for (const userWallet of usersWallets) {
      const contractWithWallet = TradeCentral.connect(userWallet);
      const user = { email: randEmail(), name: randFullName() };
      // const userExists = await TradeCentral.userExists(userWallet.address);
      // console.log(`User ${user.name} with email ${user.email} exists: ${userExists}`);
      // if (userExists) continue;
      const tx = await contractWithWallet['createUser(string,string)'](user.ema il, user.name);
      const receipt = await tx.wait();
      console.log(`User ${user.name} created with email ${user.email} at block ${receipt.blockNumber}`);
    }
  }

  if (totalTrades.isZero()) {
    // Create a new trades for each user
    let tradesToCreate = 2;
    for (const userWallet of usersWallets) {
      tradesToCreate++;
      const contractWithWallet = TradeCentral.connect(userWallet);
      for (let i = 0; i < tradesToCreate; i++) {
        const tx = await contractWithWallet['createTrade(uint256,string,string,string,string,string)'](
          ethers.utils.parseEther(`0.00${randNumber({ min: 1, max: 99 })}`),
          randProductName(),
          `${randProductDescription()}`,
          randProductCategory(),
          randCountry(),
          ""
        );

        const receipt = await tx.wait();
        console.log(`Trade for user #${tradesToCreate} created at block ${receipt.blockNumber}`);
      }
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
