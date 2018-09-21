import * as React from 'react';
import { gpuModelsList, cpuModelsList } from '../../data';
import AppView from './view';
import { IInputFields, IAppValues } from './types';
import { ISelectListItem } from '../types';
import { getRequest } from './request-composer';

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
