require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
const ENV = require("dotenv");

//initialise environment for use
ENV.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  //export the dot env config'd network configuration.Goerli in this case (rinkeby in vid tutorial)
  networks: {
    goerli: {
      url: process.env.REACT_APP_GOERLI_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
    },
  }, 
  // note the etherscan app needs to be placed outside of the networks property of exports object... as a separate property.
  etherscan:{
    apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
  },
};
