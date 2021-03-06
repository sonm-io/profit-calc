import * as React from 'react';
import { gpuList, gpuModelsList, cpuModelsList } from '../../data';
import AppView from './view';
import { IInputFields, IAppValues } from './types';
import { ISelectListItem } from '../types';
import { getRequest } from './request-composer';
import { getEstimateProfit } from './response-parser';
import { IGpu } from '../gpu-list';
import { IBenchmarks } from '../benchmarks';
import { LoadMask } from '../load-mask';
import { TEstimateProfit } from '../results-panel';

class App extends React.Component<{}, IAppValues> {

  private static defaultGpu: IGpu = Object.freeze({ 
    ethhash: "0",
    equihash200: "0",
    count: 1
  });

  private static maxGpus = 16;

  private static defaultEstimateProfit: TEstimateProfit = [undefined, undefined, undefined];

  constructor(props: {}) {
    super(props);
    this.state = {
      showBenchmarks: false,
      gpuList: [{...App.defaultGpu}],
      ethhash: '0',
      equihash200: '0',
      cpu: 1,
      ram: '8',
      storage: '20',
      networkIn: '50',
      networkOut: '20',
      networkPublicIp: false,
      estimateProfit: App.defaultEstimateProfit,
      isPending: false,
      showTrySonm: false
    }
  }

  //#region GPU
  private handleSwitchBenchmarkVisibility = () => {
    this.setState({ showBenchmarks: !this.state.showBenchmarks });
  }
  
  private handleChangeGpuModel = (listIndex: number, selectedItem: ISelectListItem) => {
    const list = [...this.state.gpuList];
    const gpu = list[listIndex]
    gpu.model = selectedItem;
    gpu.ethhash = (parseFloat(gpuList[selectedItem.value].benchmarks["gpu-eth-hashrate"]) / 1000000).toString();
    gpu.equihash200 = gpuList[selectedItem.value].benchmarks["gpu-cash-hashrate"];
    this.updateGpuBenchmarkInputFields(list);
  }

  private handleChangeGpuCount = (listIndex: number, value?: number) => {
    const list = [...this.state.gpuList];
    list[listIndex].count = value;
    this.updateGpuBenchmarkInputFields(list);
  }

  private handleBlurCount = (listIndex: number) => {
    const gpuCount = this.state.gpuList.reduce((acc, g) => acc + (g.count||1), 0);
    if (gpuCount > App.maxGpus) {
      const list = [...this.state.gpuList];
      const gpu = list[listIndex]
      gpu.count = (gpu.count||1) - (gpuCount - App.maxGpus);
      this.setState({ gpuList: list })
    }
  }

  private handleRemoveGpu = (listIndex: number) => {
    const list = [...this.state.gpuList];
    list.splice(listIndex, 1);
    this.updateGpuBenchmarkInputFields(list);
  }

  private handleAddGpu = () => {
    const list = [...this.state.gpuList];
    list.push({...App.defaultGpu});
    this.updateGpuBenchmarkInputFields(list);
  }

  private updateGpuBenchmarkInputFields = (selectedGpuList: IGpu[]) => {
    const update: any = {
      gpuList: selectedGpuList,
    }
    this.setState(update as Pick<IInputFields, keyof IInputFields>);
  }

  private handleChangeBenchmarks = (listIndex: number, field: keyof (IBenchmarks), value: string) => {
    const list = [...this.state.gpuList];
    list[listIndex][field] = value;
    this.setState({
      gpuList: list
    });
  }
  //#endregion
  
  private handleChange = (param: keyof(IInputFields), value: string | number | boolean) => {
    const newState = { [param]: value };
    this.setState(newState as Pick<IInputFields, keyof IInputFields>);
  }
  
  private handleChangeCpu = (item: ISelectListItem) => {
    this.setState({ cpu: item.value });
  }
  
  private handleCalculate = () => {
    this.setState({ isPending: true });
    const addrs = {
      test: 'https://node-testnet.sonm.com:443/OrderPredictorServer/PredictSupplier/',
      live: 'https://node.livenet.sonm.com:443/OrderPredictorServer/PredictSupplier/'
    };
    const url = addrs.live;
    const data = getRequest(this.state);
    // console.log(JSON.stringify(data));

    fetch(url, {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify(data),
    }).then(response => {
      return response.json(); 
    }).then(result => {
      const value = result.price
        ? getEstimateProfit(result.price.perSecond)
        : result.error === 'no plans found'
        ? 'no-plans-found'
        : 'server-failed';
      this.setState({ 
        estimateProfit: value,
        isPending: false,
        showTrySonm: !!result.price
      });
    }).catch((err) => { 
      console.log(err);
      this.setState({ 
        estimateProfit: 'server-failed',
        isPending: false,
        showTrySonm: false,
      });
    });
  }

  public render() {
    // console.log('render App');
    const s = this.state;
    return (
      <LoadMask visible={s.isPending} white>
        <AppView
          gpuModelsList={gpuModelsList}
          cpuModelsList={cpuModelsList}
          maximumCardsAllowed={App.maxGpus}
          {...s}
          onSwitchBenchmarkVisibility={this.handleSwitchBenchmarkVisibility}
          onChangeGpuModel={this.handleChangeGpuModel}
          onChangeBenchmarks={this.handleChangeBenchmarks}
          onChangeGpuCount={this.handleChangeGpuCount}
          onBlurCount={this.handleBlurCount}
          onRemoveGpu={this.handleRemoveGpu}
          onAddGpu={this.handleAddGpu}
          onChange={this.handleChange}
          onChangeCpu={this.handleChangeCpu}
          onCalculate={this.handleCalculate}
        />
      </LoadMask>
    );
  }
}

export default App;
