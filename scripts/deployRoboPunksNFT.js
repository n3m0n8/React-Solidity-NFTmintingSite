// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
// async funct . first assignmeent sets Robopunks nft const as the solidity class construct for the robopunks nft held in /contracts - this one is capitalised to make it clear that we are refering here to the CLASS TEMPLATE CONSTRUCT
  const ROBO_PUNKS_NFT = await hre.ethers.getContractFactory('RoboPunksNFT');
  // with this const, we instead define the OBJECT INSTANCE of that robopunksnft class which will deploy the class' constructor Method.
  const Robo_Punks_NFT = await ROBO_PUNKS_NFT.deploy();
    //await promise response on the object instance of the class then log me out cofnirm that this instance has been deployed to specified wallet address: 
    await Robo_Punks_NFT.deployed();
    console.log('LogD that our NFT instance is deployed to: ', Robo_Punks_NFT.address);
}

main()
  .then(() => process.exit(0))
    .catch((error)=>{
      console.error(error);
      process.exit(1);
    }); 

/* 
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
*/