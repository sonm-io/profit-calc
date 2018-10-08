import { gpuList, cpuList } from '../../data';
import { IAppValues } from './types';
import { IGpu } from '../gpu-list';

const getGpu = (gpu: IGpu) => {
  const gpuModel = gpuList[gpu.model === undefined ? 0 : gpu.model.value];
  const count = gpu.count||1;
  const mem = parseFloat(gpuModel.benchmarks["gpu-mem"]);

  return {
    "device": {
      "Memory": mem
    },
    "benchmarks": {
      "10": {
        "ID": 10,
        "code": "gpu-cash-hashrate",
        "type": 2,
        "result": parseFloat(gpuModel.benchmarks['gpu-cash-hashrate']), // * count,
        "splittingAlgorithm": 1
      },
      "7": {
        "ID": 7,
        "code": "gpu-count",
        "type": 2,
        "result": count,
        "splittingAlgorithm": 1
      },
      "8": {
        "ID": 8,
        "code": "gpu-mem",
        "type": 2,
        "result": mem,
        "splittingAlgorithm": 2
      },
      "9": {
        "ID": 9,
        "code": "gpu-eth-hashrate",
        "type": 2,
        "result": parseFloat(gpuModel.benchmarks['gpu-eth-hashrate']), // * count,
        "splittingAlgorithm": 1
      }
    }
  }
}

const getCpuBenchmarks = (cpu: any) => {
  return {
    "device": {
      "cores": parseFloat(cpu['cpu-cores']),
      "sockets": 2
    },
    "benchmarks": {
      "0": {
        "code": "cpu-sysbench-multi",
        "result": parseFloat(cpu['cpu-sysbench-multi'])
      },
      "1": {
        "ID": 1,
        "code": "cpu-sysbench-single",
        "result": parseFloat(cpu['cpu-sysbench-single']),
      },
      "2": {
        "ID": 2,
        "code": "cpu-cores",
        "result": parseFloat(cpu['cpu-cores'])
      }
    }
  };
}

const getRam = (s: IAppValues) => {
  const size = parseFloat(s.ram) * 1024 * 1024 * 1024;
  return  {
    "device": {
      "total": size,
      "available": size
    },
    "benchmarks": {
      "3": {
        "ID": 3,
        "code": "ram-size",
        "type": 3,
        "result": size,
        "splittingAlgorithm": 1
      }
    }
  };
}

const getNetwork = (s: IAppValues) => {
  const inSpeed = parseFloat(s.networkIn) * 1024 * 1024;
  const outSpeed = parseFloat(s.networkOut) * 1024 * 1024;
  return {
    "in": inSpeed,
    "out": outSpeed,
    "benchmarksIn": {
      "5": {
        "ID": 5,
        "code": "net-download",
        "type": 5,
        "result": inSpeed,
        "splittingAlgorithm": 1
      }
    },
    "benchmarksOut": {
      "6": {
        "ID": 6,
        "code": "net-upload",
        "type": 6,
        "result": outSpeed,
        "splittingAlgorithm": 1
      }
    }
  };
}

const getStorage = (s: IAppValues) => {
  const size = parseFloat(s.storage) * 1024 * 1024 * 1024;
  return {
    "device": {
      "bytesAvailable": size
    },
    "benchmarks": {
      "4": {
        "ID": 4,
        "code": "storage-size",
        "type": 4,
        "result": size,
        "splittingAlgorithm": 1
      }
    }
  };
}

export const getRequest = (s: IAppValues) => {
  // const gpuBenchmarks = computeGpuBenchmarks(s.gpuList);
  // const cpu = getCpuBenchmarks(cpuList[s.cpu].benchmarks);
  // return {
  //   "network": {
  //     "overlay": true,
  //     "outbound": true,
  //     "incoming": s.networkPublicIp
  //   },
  //   "benchmarks": {
  //     "ram-size":  parseFloat(s.ram) * 1024 * 1024 * 1024,
  //     "storage-size": parseFloat(s.storage) * 1024 * 1024 * 1024,
  //     "net-download": parseFloat(s.networkIn) * 1024 * 1024,
  //     "net-upload": parseFloat(s.networkOut) * 1024 * 1024,
  //     "gpu-count": gpuBenchmarks["gpu-count"],
  //     "gpu-mem": gpuBenchmarks["gpu-mem"],
  //     'gpu-eth-hashrate': parseFloat(s.ethhash) * 1000 * 1000,
  //     'gpu-cash-hashrate': parseFloat(s.equihash200),
  //     ...cpu
  //   }
  // }
  return {
    "Devices": {
      "CPU": getCpuBenchmarks(cpuList[s.cpu].benchmarks),
      "GPUs": s.gpuList.map(getGpu),
      "RAM": getRam(s),
      "network": getNetwork(s),
      "storage": getStorage(s)
    }
  }
}
