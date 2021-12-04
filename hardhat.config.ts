import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import dotenv from 'dotenv'


if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const config: HardhatUserConfig = {
  paths: {
    artifacts: './frontend/src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.4"
  },
  etherscan: {
    apiKey: `${process.env.ETHER_SCAN_KEY}`
  },
};

export default config;