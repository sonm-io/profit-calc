import * as React from 'react';
import { Gpu, IGpuEvents } from '../gpu';
import { ISelectListItem } from '../types';
import './index.css';

export interface IGpu {
  model: ISelectListItem;
  count?: number;
};

export interface IGpuListProps extends IGpuEvents {
  gpuModelsList: ISelectListItem[];
  gpuList: IGpu[];
}

export class GpuList extends React.Component<IGpuListProps, never> {

  public render() {
    console.log('render GpuList');
    return (
      <div className="gpu-list">
        {this.props.gpuList.map((gpu, index) => (
          <Gpu
            key={index}
            index={index}
            gpuModelsList={this.props.gpuModelsList}
            selectedGpu={gpu.model}
            count={gpu.count}
            onChangeGpuModel={this.props.onChangeGpuModel}
            onChangeGpuCount={this.props.onChangeGpuCount}
            onRemoveGpu={this.props.onRemoveGpu}
          />
        ))}
      </div>
    );
  }
}

export default GpuList;
