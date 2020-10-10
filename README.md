<p align="center">
  <img src="https://eraswaptoken.io/images/es_newlogo.png">
</p>

[![tests status](https://github.com/KMPARDS/esn-contracts/workflows/tests/badge.svg)](https://github.com/KMPARDS/esn-contracts/actions) [![solidity v0.7.2](https://badgen.net/badge/solidity/v0.7.2/blue)](https://solidity.readthedocs.io/en/v0.7.2/) [![typescript strict](https://badgen.net/badge/typescript/strict/blue?icon=typescript)](https://www.typescriptlang.org/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![HitCount](https://hits.dwyl.com/kmpards/esn-contracts.svg)](https://hits.dwyl.com/kmpards/esn-contracts)

EraSwap Smart Contracts to be deployed on Ethereum and Era Swap Network. View project architecture [here](https://github.com/KMPARDS/esn-contracts/issues/77). You can find high level info about the products and their interconnection with each other in the [whitepaper](https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf).

## Directory Structure

This repo contains multiple projects associated with Era Swap on `ETH` and `ESN` chains.

- **`contracts`**: Contains all solidity contract files seperated by the chain on which it is to be deployed (`ETH` vs `ESN`).
- **`test`**: Contains test cases dirs for all projects in the `suites` directory.
- **`scripts`**: Contains scripts that are used to deploy contracts and migrate intial state.

## Available Scripts

In the project directory, you can run:

### `npm run test`

Initially it compiles your contracts and places them in a `build` folder. This step is skipped if no changes are made in the contracts source codes. Then it spins two ganache servers (one represents `ETH` and other `ESN`) and it runs your typescript test suite.

### `npm run compile`

It simply compiles your contracts, places them in the build folder and generates typechain outputs.

## Useful links

- [Solidity Documentation](https://solidity.readthedocs.io/en/v0.7.0/).
- [Ethers.js Documentation](https://docs.ethers.io/ethers.js/html/).
- [Mocha Documentation](https://devdocs.io/mocha-api/).
- [TypeScript Documentation](https://www.typescriptlang.org/docs/home).
- [Typechain Docummentation](https://github.com/ethereum-ts/TypeChain#typechain)

## More Information

- You can customise to a specific `solc` version by doing `npm i solc@0.5.10`, but it's not recommended. Note: `solc@0.4.*` will not work with this template, because it has a different compile.js structure. It is recommended that you upgrade your smart contract code to be able to be compiled by a `solc@0.5.*` and above compiler. You can check out [breaking changes](https://solidity.readthedocs.io/en/v0.5.0/050-breaking-changes.html) in `0.5.*` and [breaking changes](https://solidity.readthedocs.io/en/v0.6.0/060-breaking-changes.html) in `0.6.*`and upgrade your smart contracts accordingly.
- If something doesn't work, [file an issue here](https://github.com/zemse/create-solidity-project/issues/new).
