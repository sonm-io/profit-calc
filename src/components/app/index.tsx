import * as React from 'react';
import { gpuList, cpuList, gpuModelsList, cpuModelsList } from '../../data';
import AppView, { IAppValues, IInputFields } from './view';
import { ISelectListItem } from '../types';

class App extends React.Component<{}, IAppValues> {

  private static defaultListItem: ISelectListItem = { value: -1, label: 'None' };
  private static defaultGpu = Object.freeze({ model: App.defaultListItem, count: 1 });

  constructor(props: {}) {
    super(props);
    this.state = {
      gpuList: [{...App.defaultGpu}],
      equihash200: '',
      ethhash: '',
      cpu: 1,
      ram: '',
      storage: '',
      networkIn: '',
      networkOut: '',
      networkPublicIp: '',
      estimateProfit: [undefined, undefined, undefined],
      showBenchmarks: false,
      isPending: false
    }
  }

  //#region GPU
  private handleChangeGpuModel = (listIndex: number, selectedItem: ISelectListItem) => {
    const list = [...this.state.gpuList];
    list[listIndex].model = selectedItem;
    this.setState({gpuList: list});
  }

  private handleChangeGpuCount = (listIndex: number, value?: number) => {
    const list = [...this.state.gpuList];
    list[listIndex].count = value;
    this.setState({gpuList: list});
  }

  private handleRemoveGpu = (listIndex: number) => {
    const list = [...this.state.gpuList];
    list.splice(listIndex, 1);
    this.setState({gpuList: list});
  }

  private handleAddGpu = () => {
    const list = [...this.state.gpuList];
    list.push({...App.defaultGpu});
    this.setState({gpuList: list});
  }
  //#endregion

  private handleSwitchBenchmarkVisibility = () => {
    this.setState({ showBenchmarks: !this.state.showBenchmarks });
  }
  
  private handleChange = (param: keyof(IInputFields), value: string | number | boolean) => {
    const newState = { [param]: value };
    this.setState(newState as Pick<IInputFields, keyof IInputFields>);
  }
  
  private handleChangeCpu = (item: ISelectListItem) => {
    this.setState({ cpu: item.value });
  }
  
  private computeGpuBenchmarks = () => {
    const s = this.state;
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

  private getRequest = () => {
    const s = this.state;
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
        ...this.computeGpuBenchmarks(),
        ...cpu
      }
    }
  }

  private handleCalculate = () => {
    this.setState({ isPending: true });
    const addrs = {
      test: 'https://node-testnet.sonm.com:443/OrderPredictorServer/Predict/',
      live: 'https://node.livenet.sonm.com:443/OrderPredictorServer/Predict/'
    };
    const url = addrs.live;
    const data = this.getRequest();
    
    fetch(url, {
        method: "POST",
        mode: "no-cors",
        redirect: "follow",
        body: JSON.stringify(data),
    }).then(res => {
      this.setState({ 
        estimateProfit : ['1', '1', '1'],
        isPending: false
      });
    }).catch((err) => { 
      console.log(err);
    });
  }


  public render() {
    const s = this.state;
    return (
      <AppView
        gpuModelsList={gpuModelsList}
        cpuModelsList={cpuModelsList}
        {...s}
        onChangeGpuModel={this.handleChangeGpuModel}
        onChangeGpuCount={this.handleChangeGpuCount}
        onRemoveGpu={this.handleRemoveGpu}
        onSwitchBenchmarkVisibility={this.handleSwitchBenchmarkVisibility}
        onAddGpu={this.handleAddGpu}
        onChange={this.handleChange}
        onChangeCpu={this.handleChangeCpu}
        onCalculate={this.handleCalculate}
      />
    );
  }
}

export default App;
