import { gpuList, cpuList } from '../../data';
import { IAppValues } from './types';
import { IGpu } from '../gpu-list';

export const computeGpuBenchmarks = (selectedGpuList: IGpu[]) => {
  const selectedGpus = selectedGpuList.filter(gpu => gpu.model.value > -1);
  const aggregatedBenchmarks = selectedGpus
    .reduce((acc, gpu) => {
      const gpuModel = gpuList[gpu.model.value];
      const count = gpu.count||1;
      return {
        'gpu-eth-hashrate': acc['gpu-eth-hashrate'] + parseFloat(gpuModel.benchmarks['gpu-eth-hashrate']) * count,
        'gpu-cash-hashrate': acc['gpu-cash-hashrate'] + parseFloat(gpuModel.benchmarks['gpu-cash-hashrate']) * count,
        'gpu-mem': Math.min(acc['gpu-mem'], parseFloat(gpuModel.benchmarks['gpu-mem'])),
        'gpu-count': acc['gpu-count'] + (gpu.count||1),
      }
    },
    {
      'gpu-eth-hashrate':  0,
      'gpu-cash-hashrate': 0,
      'gpu-mem': selectedGpus.length === 0 ? 0 : Infinity,
      'gpu-count': 0,
    });
  return aggregatedBenchmarks;
}

const getCpuBenchmarks = (cpu: any) => {
  return {
    'cpu-sysbench-multi': parseFloat(cpu['cpu-sysbench-multi']),
    'cpu-sysbench-single': parseFloat(cpu['cpu-sysbench-single']),
    'cpu-cores': parseFloat(cpu['cpu-cores'])
  }
}

export const getRequest = (s: IAppValues) => {
  const gpuBenchmarks = computeGpuBenchmarks(s.gpuList);
  const cpu = getCpuBenchmarks(cpuList[s.cpu].benchmarks);
  return {
    "network": {
      "overlay": true,
      "outbound": true,
      "incoming": s.networkPublicIp
    },
    "benchmarks": {
      "ram-size":  parseFloat(s.ram) * 1024 * 1024 * 1024,
      "storage-size": parseFloat(s.storage) * 1024 * 1024 * 1024,
      "net-download": parseFloat(s.networkIn) * 1024 * 1024,
      "net-upload": parseFloat(s.networkOut) * 1024 * 1024,
      "gpu-count": gpuBenchmarks["gpu-count"],
      "gpu-mem": gpuBenchmarks["gpu-mem"],
      'gpu-eth-hashrate': parseFloat(s.ethhash) * 1000 * 1000,
      'gpu-cash-hashrate': parseFloat(s.equihash200),
      ...cpu
    }
  }
}
