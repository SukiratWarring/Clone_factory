require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config()


module.exports = {
  solidity: "0.8.15",
  networks:{
    rinkeby:{
      url:process.env.REACT_APP_url,
      accounts:[process.env.REACT_APP_key]
    }
  },
  etherscan:{
    apiKey:process.env.REACT_APP_apikey,
  }
};
