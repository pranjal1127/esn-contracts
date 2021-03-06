import { ethers } from 'ethers';
import { parseReceipt } from '../../utils';
import { strictEqual } from 'assert';
import { formatBytes32String, parseEther } from 'ethers/lib/utils';

export const KycResolve = () =>
  describe('Kyc Resolve', () => {
    it('resolves kyc increases tree referral count in upline', async () => {
      const randomWallet = ethers.Wallet.createRandom().connect(global.providerESN);

      await parseReceipt(
        global.dayswappersInstanceESN.connect(randomWallet).join(global.accountsESN[1])
      );

      const currentMonth = await global.nrtInstanceESN.currentNrtMonth();

      // first getting kyc approved in kyc dapp
      const kycFees = await global.kycDappInstanceESN.getKycFee(
        1,
        ethers.constants.HashZero,
        ethers.constants.HashZero
      );
      await global.providerESN.getSigner(0).sendTransaction({
        to: randomWallet.address,
        value: kycFees ?? parseEther('31.5'),
      });
      await parseReceipt(
        global.kycDappInstanceESN.connect(randomWallet).register(formatBytes32String('account0'), {
          value: kycFees ?? parseEther('31.5'),
        })
      );
      await parseReceipt(
        global.kycDappInstanceESN.updateKycStatus(
          formatBytes32String('account0'),
          1,
          ethers.constants.HashZero,
          ethers.constants.HashZero,
          1
        )
      );

      await parseReceipt(global.dayswappersInstanceESN.resolveKyc(randomWallet.address));

      const monthlyData0 = await global.dayswappersInstanceESN.getSeatMonthlyDataByAddress(
        global.accountsESN[0],
        currentMonth
      );
      const monthlyData1 = await global.dayswappersInstanceESN.getSeatMonthlyDataByAddress(
        global.accountsESN[1],
        currentMonth
      );
      // console.log(monthlyData0, monthlyData1);
      strictEqual(monthlyData0.treeReferrals, 1, 'tree referral should have become 1');
      strictEqual(monthlyData1.treeReferrals, 1, 'tree referral should have become 1');
    });

    it('deep referrals increment depth and tree referrals', async () => {
      const currentMonth = await global.nrtInstanceESN.currentNrtMonth();

      let wallet_networker = new ethers.Wallet('0x' + '1'.repeat(64)); //global.accountsESN[0]

      let topWallet = wallet_networker;

      let wallet_direct = ethers.Wallet.createRandom().connect(global.providerESN);
      let prevGas = 0;
      let prevGas2 = 0;
      const initialTreeReferrals = (
        await global.dayswappersInstanceESN.getSeatMonthlyDataByAddress(
          topWallet.address,
          currentMonth
        )
      ).treeReferrals;

      const initialDepth = 0;

      const kycFees = await global.kycDappInstanceESN.getKycFee(
        1,
        ethers.constants.HashZero,
        ethers.constants.HashZero
      );

      for (let i = 0; i < 10; i++) {
        const receipt = await parseReceipt(
          global.dayswappersInstanceESN.connect(wallet_direct).join(wallet_networker.address)
        );

        // getting kyc approved in kyc dapp

        await global.providerESN.getSigner(0).sendTransaction({
          to: wallet_direct.address,
          value: kycFees ?? parseEther('31.5'),
        });
        await parseReceipt(
          global.kycDappInstanceESN
            .connect(wallet_direct)
            .register(formatBytes32String('wallet' + i), {
              value: kycFees ?? parseEther('31.5'),
            })
        );
        await parseReceipt(
          global.kycDappInstanceESN.updateKycStatus(
            formatBytes32String('wallet' + i),
            1,
            ethers.constants.HashZero,
            ethers.constants.HashZero,
            1
          )
        );
        // console.log(
        //   wallet_direct.address.slice(0, 4),
        //   wallet_networker.address.slice(0, 4),
        //   receipt.gasUsed.toNumber(),
        //   receipt.gasUsed.toNumber() - prevGas
        // );
        prevGas = receipt.gasUsed.toNumber();

        const receipt2 = await parseReceipt(
          global.dayswappersInstanceESN.connect(wallet_direct).resolveKyc(wallet_direct.address)
        );

        // console.log(
        //   'resolving',
        //   wallet_direct.address.slice(0, 4),
        //   receipt2.gasUsed.toNumber(),
        //   receipt2.gasUsed.toNumber() - prevGas2
        // );
        prevGas2 = receipt2.gasUsed.toNumber();

        const { treeReferrals } = await global.dayswappersInstanceESN.getSeatMonthlyDataByAddress(
          topWallet.address,
          currentMonth
        );

        strictEqual(
          treeReferrals,
          initialTreeReferrals + i + 1,
          'tree referrals should have incremented'
        );

        const { depth } = await global.dayswappersInstanceESN.getSeatByAddressStrict(
          wallet_direct.address
        );

        strictEqual(depth, initialDepth + i + 1, 'tree referrals should have incremented');

        // console.log(
        //   'top wallet tree referrals',
        //   treeReferrals,
        //   'current direct wallet depth',
        //   depth,
        //   '\n'
        // );

        wallet_networker = wallet_direct;
        wallet_direct = ethers.Wallet.createRandom().connect(global.providerESN);
      }
    });
  });
