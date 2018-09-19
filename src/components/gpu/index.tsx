import './index.css';
import * as React from 'react';
import * as cn from 'classnames'

import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select';

import { ISelectListItem } from '../types';
import { FormField, IFormFieldCssClasses } from '../form-field';

export interface IGpuEvents {
  onChangeGpuModel: (listIndex: number, selectedItem: ISelectListItem) => void;
  onChangeGpuCount: (listIndex: number, value?: number) => void;
  onRemoveGpu: (listIndex: number) => void;
}

export interface IGpuProps extends IGpuEvents {
  gpuModelsList: ISelectListItem[];
  selectedGpu: ISelectListItem;
  count?: number;
  index: number;
}

const selectFieldCssClasses: IFormFieldCssClasses = {
  root: 'form-field',
  label: 'form-field__label',
  input: 'gpu__full-width',
  help: 'form-field__help',
};

export class Gpu extends React.Component<IGpuProps, never> {

  private handleChangeGpu = (selectedItem: ISelectListItem) => {
    this.props.onChangeGpuModel(this.props.index, selectedItem);
  };

  private handleChangeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChangeGpuCount(
      this.props.index,
      parseInt(event.target.value, undefined) || undefined,
    );
  };

  private handleClose = () => {
    this.props.onRemoveGpu(this.props.index);
  };  

  public render() {
    return (
      <div className="gpu">
        <FormField
          className={cn('gpu__full-width', 'gpu__field-model')}
          cssClasses={selectFieldCssClasses}
          label="Model"
          horizontal
        >
          <Select
            options={this.props.gpuModelsList}
            value={this.props.selectedGpu}
            onChange={this.handleChangeGpu}
            placeholder="Search your GPU Model"
          />
        </FormField>
        <FormField className={cn('gpu__field')} label="Count" horizontal>
          <TextField
            className="gpu__input-count"
            value={this.props.count || ''}
            onChange={this.handleChangeCount}
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
