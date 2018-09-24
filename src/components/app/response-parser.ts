import { BN } from 'bn.js';
import { TEstimateProfit } from '../results-panel';
import { BalanceUtils } from 'src/utils/balance-utils';

const bn3600 = new BN('3600');
const bn24 = new BN('24');
const bn30 = new BN('30');

export const getEstimateProfit = (usdPow18PerSec: string): TEstimateProfit => {
  const input = new BN(usdPow18PerSec);
  const usdPerHour = input.mul(bn3600);
  const usdPerDay = usdPerHour.mul(bn24);
  const usdPer30days = usdPerDay.mul(bn30);
  return [
    BalanceUtils.formatBalance(usdPerHour.toString(), 4),
    BalanceUtils.formatBalance(usdPerDay.toString(), 4),
    BalanceUtils.formatBalance(usdPer30days.toString(), 4)
  ];
}
