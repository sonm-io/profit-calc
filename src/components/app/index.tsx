import * as React from 'react';
import { gpuListMapped } from '../../data';
import AppView, { IAppValues, IInputFields } from './view';
import { ISelectListItem } from '../types';

class App extends React.Component<{}, IAppValues> {

  constructor() {
    super({});
    this.state = {
      gpuList: [{ modelIndex: 0 }],
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
    console.log(listIndex);
    console.log(selectedItem);
    const list = [...this.state.gpuList];
    list[listIndex].modelIndex = selectedItem.value;
    this.setState({gpuList: list});
  }

  private handleChangeGpuCount = (listIndex: number, value?: number) => {
    console.log(listIndex);
    console.log(value);
    const list = [...this.state.gpuList];
    list[listIndex].count = value;
    this.setState({gpuList: list});
  }

  private handleRemoveGpu = (listIndex: number) => {
    console.log(listIndex);
    const list = [...this.state.gpuList];
    list.splice(listIndex, 1);
    this.setState({gpuList: list});
  }

  private handleAddGpu = () => {
    const list = [...this.state.gpuList];
    list.push({ modelIndex: 0 });
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
