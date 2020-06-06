/// @dev importing packages required
import assert from 'assert';
import { ethers } from 'ethers';

/// @dev importing build file
const plasmaManagerJSON = require('../../../build/ETH/PlasmaManager_PlasmaManager.json');

/// @dev this is another test case collection
export const PlasmaManagerContract = () =>
  describe('Plasma Manager Contract Setup', async () => {
    /// @dev this is first test case of this collection
    it('deploys Plasma Manager contract from first account with initial storage: Hello World', async () => {
      /// @dev you create a contract factory for deploying contract. Refer to ethers.js documentation at https://docs.ethers.io/ethers.js/html/
      const PlasmaManagerContractFactory = new ethers.ContractFactory(
        plasmaManagerJSON.abi,
        plasmaManagerJSON.evm.bytecode.object,
        global.providerETH.getSigner(global.accountsETH[0])
      );

      global.validatorAddresses = [
        global.accountsETH[0],
        global.accountsETH[1],
        global.accountsETH[2],
      ];

      global.plasmaManagerInstanceETH = await PlasmaManagerContractFactory.deploy(
        global.validatorAddresses,
        global.esInstanceETH.address
      );

      assert.ok(
        global.plasmaManagerInstanceETH.address,
        'conract address should be present'
      );
    });

    /// @dev this is second test case of this collection
    it('checks validators set while deploying', async () => {
      /// @dev you access the value at storage with ethers.js library of our custom contract method called getValue defined in contracts/PlasmaManager.sol
      const currentValidators = await global.plasmaManagerInstanceETH.getAllValidators();

      /// @dev then you compare it with your expectation value
      assert.deepEqual(
        currentValidators,
        global.validatorAddresses,
        'validators set while deploying must be visible when get'
      );
    });

    it('checks token contract set while deploying', async () => {
      const tokenAddress = await global.plasmaManagerInstanceETH.token();

      assert.equal(
        global.esInstanceETH.address,
        tokenAddress,
        'token address should be set properly'
      );
    });
  });
