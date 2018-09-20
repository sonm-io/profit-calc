import * as React from 'react';
import { gpuListMapped } from '../../data';
import AppView, { IAppValues, IInputFields } from './view';
import { ISelectListItem } from '../types';

class App extends React.Component<{}, IAppValues> {

  private static defaultListItem: ISelectListItem = { value: -1, label: 'None' };
  private static defaultGpu = Object.freeze({ model: App.defaultListItem, count: 1 });

  constructor() {
    super({});
    this.state = {
      gpuList: [{...App.defaultGpu}],
      equihash200: '',
      ethhash: '',
      cpu: 0,
      ram: '',
      storage: '',
      networkIn: '',
      networkOut: '',
      networkPublicIp: '',
      estimateProfit: [undefined, undefined, undefined],
      showBenchmarks: false
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
    console.log('calc');
  }


  public render() {
    const s = this.state;
    return (
      <AppView
        gpuModelsList={gpuListMapped}
        cpuModelsList={gpuListMapped}
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
