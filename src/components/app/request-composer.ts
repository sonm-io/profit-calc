import { gpuList, cpuList } from '../../data';
import { IAppValues } from './types';

const computeGpuBenchmarks = (s: IAppValues) => {
  const selectedGpus = s.gpuList.filter(gpu => gpu.model.value > -1);
  const count = gpuList.reduce((acc, gpu) => acc + (gpu.count||1), 0);
  const aggregatedBenchmarks = selectedGpus
    .reduce((acc, gpu) => {
      const gpuModel = gpuList[gpu.model.value];
      return {
        'gpu-eth-hashrate': acc['gpu-eth-hashrate'] + parseInt(gpuModel.benchmarks['gpu-eth-hashrate'], 0),
        'gpu-cash-hashrate': acc['gpu-cash-hashrate'] + parseInt(gpuModel.benchmarks['gpu-cash-hashrate'], 0),
        'gpu-mem': acc['gpu-mem'] + parseInt(gpuModel.benchmarks['gpu-mem'], 0),
      }
    },
    {
      'gpu-eth-hashrate':  0,
      'gpu-cash-hashrate': 0,
      'gpu-mem': 0,
    });
  return {
    ...aggregatedBenchmarks,
    "gpu-count": count
  }
}

export const getRequest = (s: IAppValues) => {
  const cpu = cpuList[s.cpu].benchmarks;
  return {
    "network": {
      "overlay": s.networkPublicIp,
      "outbound": true,
      "incoming": true
    },
    "benchmarks": {
      "ram-size": s.ram,
      "storage-size": s.storage,
      "net-download": s.networkIn,
      "net-upload": s.networkOut,
      ...computeGpuBenchmarks(s),
      ...cpu
    }
  }
}
