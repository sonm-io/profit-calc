import { IGpu } from '../gpu-list';
import { TEstimateProfit } from '../results-panel';

export interface IInputFields {
  equihash200: string;
  ethhash: string;
  ram: string;
  storage: string;
  networkIn: string;
  networkOut: string;
  networkPublicIp: boolean;
}

export interface IAppValues extends IInputFields {
  showBenchmarks: boolean;
  gpuList: IGpu[];
  cpu: number;
  estimateProfit: TEstimateProfit;
  isPending: boolean;
}
