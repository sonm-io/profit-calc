import * as React from 'react';
// externals
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// local
import './index.css';
import FormField from '../form-field';
import Benchmarks from '../benchmarks';
import { GpuList, IGpuListProps, TGpuList } from '../gpu-list';
import { ResultsPanel, TEstimateProfit } from '../results-panel';
import { ISelectListItem } from '../types';

export interface IInputFields {
  equihash200: string;
  ethhash: string;
  cpu: number;
  ram: string;
  storage: string;
  networkIn: string;
  networkOut: string;
  networkPublicIp: string;
}

export interface IAppValues extends IInputFields {
  gpuList: TGpuList;
  estimateProfit: TEstimateProfit;
  showBenchmarks: boolean;
}

interface IAppViewProps extends IAppValues, IGpuListProps {
  cpuModelsList: ISelectListItem[];
  // events:
  onSwitchBenchmarkVisibility: () => void;
  onAddGpu: () => void;
  onChange: (param: keyof (IInputFields), value: string | boolean) => void;
  onChangeCpu: (item: ISelectListItem) => void;
  onCalculate: () => void;
}

class AppView extends React.Component<IAppViewProps, never> {
  private renderBenchmarksVisibilityTrigger = () => {
    const label = this.props.showBenchmarks ? 'Hide benchmarks' : 'Show benchmarks';
    return <a href="#" onClick={this.props.onSwitchBenchmarkVisibility}>{label}</a>;
  };

  private handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.name as keyof (IInputFields), event.target.value);
  };

  private handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.props.onChange(event.target.name as keyof (IInputFields), checked);
  };

  public render() {
    const p = this.props;
    return (
      <div className="app">
        <h1>Profitability calculator</h1>
        <h3>GPU</h3>
        <GpuList {...p} />
        {this.renderBenchmarksVisibilityTrigger()}
        <a href="#" onClick={p.onAddGpu}>Add card</a>
        { 
          p.showBenchmarks &&
          <Benchmarks equihash200={p.equihash200} ethhash={p.ethhash} onChange={p.onChange} />
        }
        <FormField horizontal label="CPU level">
          <Select
            placeholder="Select your CPU"
            options={p.cpuModelsList}
            value={p.cpuModelsList[p.cpu]}
            onChange={p.onChangeCpu}
          />
        </FormField>
        <FormField horizontal label="RAM, GB">
          <TextField name="ram" value={p.ram} onChange={this.handleChangeInput} />
        </FormField>
        <FormField horizontal label="Storage, GB">
          <TextField name="storage" value={p.storage} onChange={this.handleChangeInput} />
        </FormField>
        <h3>Internet connection, Mbps</h3>
        <FormField horizontal label="IN">
          <TextField name="networkIn" value={p.networkIn} onChange={this.handleChangeInput} />
        </FormField>
        <FormField horizontal label="OUT">
          <TextField name="networkOut" value={p.networkOut} onChange={this.handleChangeInput} />
        </FormField>
        <FormControlLabel
          control={
            <Checkbox
              name="networkPublicIp"
              checked={p.networkPublicIp}
              onChange={this.handleChangeCheckbox}
            />
          }
          label="Public IP"
        />
        <ResultsPanel values={p.estimateProfit} onCalculate={this.props.onCalculate} />
      </div>
    );
  }
}

export default AppView;
