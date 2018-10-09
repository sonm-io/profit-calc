import './index.css';
import * as React from 'react';
import * as cn from 'classnames'

import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select';

import { ISelectListItem } from '../types';
import { FormField, IFormFieldCssClasses } from '../form-field';
import selectStyles from '../styled/select';
import { IBenchmarks, Benchmarks } from '../benchmarks';

export interface IGpuEvents {
  onChangeGpuModel: (listIndex: number, selectedItem: ISelectListItem) => void;
  onChangeGpuCount: (listIndex: number, value?: number) => void;
  onBlurCount: (listIndex: number) => void;
  onRemoveGpu: (listIndex: number) => void;
  onChangeBenchmarks: (listIndex: number, field: keyof (IBenchmarks), value: string) => void;
}

export interface IGpuProps extends IGpuEvents, IBenchmarks {
  gpuModelsList: ISelectListItem[];
  model?: ISelectListItem;
  count?: number;
  index: number;
}

const selectFieldCssClasses: IFormFieldCssClasses = {
  root: 'form-field',
  label: 'form-field__label',
  input: 'gpu__full-width',
  help: 'form-field__help',
};

export class Gpu extends React.PureComponent<IGpuProps, never> {

  private handleChangeGpu = (selectedItem: ISelectListItem) => {
    this.props.onChangeGpuModel(this.props.index, selectedItem);
  };

  private handleChangeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChangeGpuCount(
      this.props.index,
      parseInt(event.target.value, undefined) || undefined,
    );
  };

  private handleBlurCount = () => {
    this.props.onBlurCount(this.props.index);
  }

  private handleClose = () => {
    this.props.onRemoveGpu(this.props.index);
  };  

  private handleChangeBenchmarks = (field: keyof (IBenchmarks), value: string) => {
    this.props.onChangeBenchmarks(this.props.index, field, value);
  }

  public render() {
    // console.log('render Gpu');
    return (
      <div className="gpu">
        <FormField
          className={cn('gpu__full-width', 'gpu__field-model')}
          cssClasses={selectFieldCssClasses}
          horizontal
        >
          <Select
            styles={selectStyles}
            options={this.props.gpuModelsList}
            value={this.props.model}
            onChange={this.handleChangeGpu}
            placeholder="Search your GPU Model or specify benchmarks"
          />
          <Benchmarks 
            ethhash={this.props.ethhash} 
            equihash200={this.props.equihash200} 
            onChange={this.handleChangeBenchmarks} 
          />
        </FormField>
        <FormField className={cn('gpu__field')} label="Count" horizontal>
          <TextField
            className="gpu__input-count"
            type="number"
            inputProps={{ min: 1 }}
            value={this.props.count || ''}
            onChange={this.handleChangeCount}
            onBlur={this.handleBlurCount}
          />
        </FormField>
        <IconButton className="gpu__button-close" aria-label="Close" onClick={this.handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  }
}

export default Gpu;
