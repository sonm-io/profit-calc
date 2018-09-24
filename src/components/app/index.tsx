import * as React from 'react';
import { gpuModelsList, cpuModelsList } from '../../data';
import AppView from './view';
import { IInputFields, IAppValues } from './types';
import { ISelectListItem } from '../types';
import { getRequest, computeGpuBenchmarks } from './request-composer';
import { getEstimateProfit } from './response-parser';
import { IGpu } from '../gpu-list';

class App extends React.Component<{}, IAppValues> {

  private static defaultListItem: ISelectListItem = { value: -1, label: 'None' };
  private static defaultGpu = Object.freeze({ model: App.defaultListItem, count: 1 });

  constructor(props: {}) {
    super(props);
    this.state = {
      gpuList: [{...App.defaultGpu}],
      ethhash: '',
      equihash200: '',
      cpu: 1,
      ram: '8',
      storage: '20',
      networkIn: '50',
      networkOut: '20',
      networkPublicIp: false,
      estimateProfit: [undefined, undefined, undefined],
      showBenchmarks: false,
      isPending: false
    }
  }

  //#region GPU
  private handleChangeGpuModel = (listIndex: number, selectedItem: ISelectListItem) => {
    const list = [...this.state.gpuList];
    list[listIndex].model = selectedItem;
    this.updateGpuBenchmarkInputFields(list);
  }

  private handleChangeGpuCount = (listIndex: number, value?: number) => {
    const list = [...this.state.gpuList];
    list[listIndex].count = value;
    this.updateGpuBenchmarkInputFields(list);
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

  private updateGpuBenchmarkInputFields = (gpuList: IGpu[]) => {
    const bmarks = computeGpuBenchmarks(gpuList);
    const update: any = {
      gpuList,
      ethhash: bmarks['gpu-eth-hashrate'] / 1000 / 1000,
      equihash200: bmarks['gpu-cash-hashrate']
    }
    this.setState(update as Pick<IInputFields, keyof IInputFields>);
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
  
  private handleCalculate = () => {
    this.setState({ isPending: true });
    const addrs = {
      test: 'https://node-testnet.sonm.com:443/OrderPredictorServer/Predict/',
      live: 'https://node.livenet.sonm.com:443/OrderPredictorServer/Predict/'
    };
    const url = addrs.live;
    const data = getRequest(this.state);
    
    fetch(url, {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify(data),
    }).then(response => {
      return response.json();
    }).then(json => {
      this.setState({ 
        estimateProfit: getEstimateProfit(json.perSecond),
        isPending: false
      });
    }).catch((err) => { 
      console.log(err);
      this.setState({ 
        estimateProfit: [undefined, undefined, undefined],
        isPending: false
      });
    });
  }

  public render() {
    console.log('render App');
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
