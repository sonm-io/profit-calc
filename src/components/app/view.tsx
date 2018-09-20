import * as React from 'react';
// externals
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
// local
import './index.css';
import FormField, { IFormFieldCssClasses } from '../form-field';
import Benchmarks from '../benchmarks';
import { GpuList, IGpuListProps, IGpu } from '../gpu-list';
import { ResultsPanel, TEstimateProfit } from '../results-panel';
import { ISelectListItem } from '../types';

export interface IInputFields {
  equihash200: string;
  ethhash: string;
  ram: string;
  storage: string;
  networkIn: string;
  networkOut: string;
  networkPublicIp: string;
}

export interface IAppValues extends IInputFields {
  gpuList: IGpu[];
  cpu: number;
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
  private static CpuCssClasses: IFormFieldCssClasses = {
    root: 'form-field',
    label: 'form-field__label',
    input: 'app__cpu-select',
    help: 'form-field__help',
  };

  private handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.name as keyof (IInputFields), event.target.value);
  };

  private handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.props.onChange(event.target.name as keyof (IInputFields), checked);
  };

  private renderBenchmarksVisibilityTrigger = () => {
    const label = this.props.showBenchmarks ? 'Hide benchmarks' : 'Show benchmarks';
    return (
      <Button
        className="app__switch-benchmarks-link"
        color="primary"
        onClick={this.props.onSwitchBenchmarkVisibility}
      >
        {label}
      </Button>
    );
  };

  private renderRamAndStorage = () => {
    const p = this.props;
    return (
      <div className="app__ram-n-storage">
        <FormField className="app__ram-field" horizontal label="RAM, GB">
          <TextField
            className="app__ram-n-storage-input"
            name="ram"
            value={p.ram}
            onChange={this.handleChangeInput}
          />
        </FormField>
        <FormField horizontal label="Storage, GB">
          <TextField
            className="app__ram-n-storage-input"
            name="storage"
            value={p.storage}
            onChange={this.handleChangeInput}
          />
        </FormField>
      </div>
    );
  };

  private renderNetwork = () => {
    const p = this.props;
    return (
      <div className="app__network">
        <FormField className="app__network-field" horizontal label="IN">
          <TextField
            className="app__network-input"
            name="networkIn"
            value={p.networkIn}
            onChange={this.handleChangeInput}
          />
        </FormField>
        <FormField className="app__network-field" horizontal label="OUT">
          <TextField
            className="app__network-input"
            name="networkOut"
            value={p.networkOut}
            onChange={this.handleChangeInput}
          />
        </FormField>
        <FormControlLabel
          className="app__network-field"
          control={
            <Checkbox
              name="networkPublicIp"
              checked={p.networkPublicIp}
              onChange={this.handleChangeCheckbox}
              color="primary"
              disableRipple={true}
            />
          }
          label="Public IP"
        />
      </div>
    );
  };

  private renderMain = () => {
    const p = this.props;
    return (
      <div className="app__main-panel">
        <h3 className="app__header">GPU</h3>
        <GpuList {...p} />
        {this.renderBenchmarksVisibilityTrigger()}
        <Button color="primary" className="app__add-gpu-link" onClick={p.onAddGpu}>
          Add card
        </Button>
        {p.showBenchmarks && (
          <Benchmarks equihash200={p.equihash200} ethhash={p.ethhash} onChange={p.onChange} />
        )}
        <FormField
          className="app__cpu-field app__separator"
          cssClasses={AppView.CpuCssClasses}
          horizontal
          label="CPU level"
        >
          <Select
            placeholder="Select your CPU"
            options={p.cpuModelsList}
            value={p.cpuModelsList[p.cpu]}
            onChange={p.onChangeCpu}
          />
        </FormField>
        {this.renderRamAndStorage()}
        <h3 className="app__header">Internet connection, Mbps</h3>
        {this.renderNetwork()}
      </div>
    );
  };

  public render() {
    const p = this.props;
    return (
      <div className="app">
        <h1>Profitability calculator</h1>
        <div className="app__container">
          {this.renderMain()}
          <ResultsPanel
            className="app__results-panel"
            values={p.estimateProfit}
            onCalculate={this.props.onCalculate}
          />
        </div>
      </div>
    );
  }
}

export default AppView;
