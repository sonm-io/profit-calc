const gpuList = [
  {
    name: 'NVidia GeForce 1050Ti',
    benchmarks: {
      'gpu-eth-hashrate': '13900000',
      'gpu-cash-hashrate': '180',
      'gpu-mem': '3100000000',
    },
  },
  {
    name: 'NVidia GeForce 1060 3GB',
    benchmarks: {
      'gpu-eth-hashrate': '20000000',
      'gpu-cash-hashrate': '270',
      'gpu-mem': '3100000000',
    },
  },
  {
    name: 'NVidia GeForce 1060 6GB',
    benchmarks: {
      'gpu-eth-hashrate': '22500000',
      'gpu-cash-hashrate': '270',
      'gpu-mem': '6300000000',
    },
  },
  {
    name: 'NVidia GeForce 1070',
    benchmarks: {
      'gpu-eth-hashrate': '30000000',
      'gpu-cash-hashrate': '430',
      'gpu-mem': '8500000000',
    },
  },
  {
    name: 'NVidia GeForce 1070Ti',
    benchmarks: {
      'gpu-eth-hashrate': '30500000',
      'gpu-cash-hashrate': '470',
      'gpu-mem': '8500000000',
    },
  },
  {
    name: 'NVidia GeForce 1080',
    benchmarks: {
      'gpu-eth-hashrate': '23300000',
      'gpu-cash-hashrate': '550',
      'gpu-mem': '8500000000',
    },
  },
  {
    name: 'NVidia GeForce 1080Ti',
    benchmarks: {
      'gpu-eth-hashrate': '35000000',
      'gpu-cash-hashrate': '685',
      'gpu-mem': '11700000000',
    },
  },
  {
    name: 'ATI Radeon RX 380',
    benchmarks: {
      'gpu-eth-hashrate': '20000000',
      'gpu-cash-hashrate': '205',
      'gpu-mem': '4300000000',
    },
  },
  {
    name: 'ATI Radeon RX 470',
    benchmarks: {
      'gpu-eth-hashrate': '26000000',
      'gpu-cash-hashrate': '260',
      'gpu-mem': '4300000000',
    },
  },
  {
    name: 'ATI Radeon RX 480',
    benchmarks: {
      'gpu-eth-hashrate': '29500000',
      'gpu-cash-hashrate': '290',
      'gpu-mem': '8500000000',
    },
  },
  {
    name: 'ATI Radeon RX 570',
    benchmarks: {
      'gpu-eth-hashrate': '27900000',
      'gpu-cash-hashrate': '260',
      'gpu-mem': '4300000000',
    },
  },
  {
    name: 'ATI Radeon RX 580',
    benchmarks: {
      'gpu-eth-hashrate': '30200000',
      'gpu-cash-hashrate': '290',
      'gpu-mem': '8500000000',
    },
  },
];

const cpuList = [
  {
    name: 'Low (lower and old versions of Intel and AMD CPUs - Celeron, Core2Duo, etc.)',
    benchmarks: {
      'cpu-sysbench-multi': '2000',
      'cpu-sysbench-single': '1100',
      'cpu-cores': '2',
      'cpu-cryptonight': '50',
    },
  },
  {
    name: 'Middle (middle versions of Intel and AMD CPUs - Core i3-i5, etc.)',
    benchmarks: {
      'cpu-sysbench-multi': '4000',
      'cpu-sysbench-single': '1200',
      'cpu-cores': '4',
      'cpu-cryptonight': '150',
    },
  },
  {
    name: 'Higher (top versions of Intel and AMD CPUs - Core i7-i9, etc.)',
    benchmarks: {
      'cpu-sysbench-multi': '8000',
      'cpu-sysbench-single': '1300',
      'cpu-cores': '8',
      'cpu-cryptonight': '220',
    },
  },
  {
    name: 'Server (server versions of Intel and AMD CPUs - Xeon, etc.)',
    benchmarks: {
      'cpu-sysbench-multi': '25000',
      'cpu-sysbench-single': '1500',
      'cpu-cores': '16',
      'cpu-cryptonight': '300',
    },
  },
];

const map = (item, index) => ({ value: index, label: item.name });

const gpuModelsList = gpuList.map((item, i) => map(item, i));

const cpuModelsList = cpuList.map((item, i) => map(item, i));

module.exports = {
  gpuList,
  cpuList,
  gpuModelsList,
  cpuModelsList,
};
