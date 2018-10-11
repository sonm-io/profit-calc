import * as React from 'react';
// externals
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '../styled/button';
import { withStyles } from '@material-ui/core/styles';
// local
import './index.css';
import FormField, { IFormFieldCssClasses } from '../form-field';
import { GpuList, IGpuListProps } from '../gpu-list';
import { ResultsPanel } from '../results-panel';
import { ISelectListItem } from '../types';
import { IInputFields, IAppValues } from './types';
import selectStyles from '../styled/select';

const StyledTooltip = withStyles({
  tooltip: {
    fontSize: 'unset',
  }
})(Tooltip);

interface IAppViewProps extends IAppValues, IGpuListProps {
  cpuModelsList: ISelectListItem[];
  maximumCardsAllowed: number;
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

  private get allowAddCard () {
    return this.props.maximumCardsAllowed >
           this.props.gpuList.reduce((acc, card) => acc + (card.count || 1), 0);
  }

  private handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.name as keyof (IInputFields), event.target.value);
  };

  private handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.props.onChange(event.target.name as keyof (IInputFields), checked);
  };

  private renderBenchmarksVisibilityTrigger = () => {
    const label = this.props.showBenchmarks ? 'Hide benchmarks' : 'Show benchmarks';
    return (
      <React.Fragment>
        <Button
          className="app__switch-benchmarks-link"
          color="primary"
          onClick={this.props.onSwitchBenchmarkVisibility}
        >
          {label}
        </Button>
        <StyledTooltip 
          title="These are a GPU performance characteristics. They are set automatically when you select a GPU card. Change them if necessary." 
          placement="right"
        >
          <HelpOutlineIcon className="app__question-mark" color="primary" />
        </StyledTooltip>
      </React.Fragment>
    );
  };

  private renderRamAndStorage = () => {
    const p = this.props;
    return (
      <div className="app__ram-n-storage">
        <FormField className="app__ram-field" horizontal label="RAM, GB">
          <TextField
            className="app__ram-n-storage-input"
            type="number"
            name="ram"
            value={p.ram}
            onChange={this.handleChangeInput}
          />
        </FormField>
        <FormField horizontal label="Storage, GB">
          <TextField
            className="app__ram-n-storage-input"
            type="number"
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
            type="number"
            name="networkIn"
            value={p.networkIn}
            onChange={this.handleChangeInput}
          />
        </FormField>
        <FormField className="app__network-field" horizontal label="OUT">
          <TextField
            className="app__network-input"
            type="number"
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
        
        <div className="app__gpu-bottom-panel">
          {p.gpuList.length > 0 ? this.renderBenchmarksVisibilityTrigger() : null}
          <span className="app__gpu-message">
            {!this.allowAddCard ? `Maximum ${p.maximumCardsAllowed} cards allowed` : null}
          </span>
          <Button
            disabled={!this.allowAddCard}
            color="primary"
            className="app__add-gpu-link"
            onClick={p.onAddGpu}
          >
            Add card
          </Button>
        </div>
        <FormField
          className="app__cpu-field app__separator"
          cssClasses={AppView.CpuCssClasses}
          horizontal
          label="CPU level"
        >
          <Select
            styles={selectStyles}
            placeholder="Select your CPU"
            options={p.cpuModelsList}
            value={p.cpuModelsList[p.cpu]}
            onChange={p.onChangeCpu}
          />
          <StyledTooltip 
            title="In the calculation of profitability for CPUs averaged characteristics are used" 
            placement="bottom-end"
          >
            <HelpOutlineIcon className="app__question-mark" color="action" />
          </StyledTooltip>
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
        <h1 className="app__title">Profitability calculator</h1>
        <p>Describe hardware configuration and find out its cost at SONM.</p>
        <div className="app__container">
          {this.renderMain()}
          <ResultsPanel
            className="app__results-panel"
            values={p.estimateProfit}
            onCalculate={!p.isPending ? this.props.onCalculate : undefined}
          />
        </div>
      </div>
    );
  }
}

export default AppView;
