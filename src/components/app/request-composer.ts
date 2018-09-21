import { gpuList, cpuList } from '../../data';
import { IAppValues } from './types';

const computeGpuBenchmarks = (s: IAppValues) => {
  const selectedGpus = s.gpuList.filter(gpu => gpu.model.value > -1);
  const count: number = gpuList.reduce((acc, gpu) => acc + (gpu.count||1), 0);
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

const getCpuBenchmarks = (cpu: any) => {
  return {
    'cpu-sysbench-multi': parseInt(cpu['cpu-sysbench-multi'], 0),
    'cpu-sysbench-single': parseInt(cpu['cpu-sysbench-single'], 0),
    'cpu-cores': parseInt(cpu['cpu-cores'], 0)
  }
}

export const getRequest = (s: IAppValues) => {
  const cpu = getCpuBenchmarks(cpuList[s.cpu].benchmarks);
  return {
    "network": {
      "overlay": s.networkPublicIp,
      "outbound": true,
      "incoming": true
    },
    "benchmarks": {
      "ram-size":  parseInt(s.ram, 0),
      "storage-size": parseInt(s.storage, 0),
      "net-download": parseInt(s.networkIn, 0),
      "net-upload": parseInt(s.networkOut, 0),
      ...computeGpuBenchmarks(s),
      ...cpu
    }
  }
}
