import * as React from 'react';
import { Gpu, IGpuEvents } from '../gpu';
import { ISelectListItem } from '../types';
import { IBenchmarks } from '../benchmarks';
import './index.css';

export interface IGpu extends IBenchmarks {
  model?: ISelectListItem;
  count?: number;
};

export interface IGpuListProps extends IGpuEvents {
  showBenchmarks: boolean;
  gpuModelsList: ISelectListItem[];
  gpuList: IGpu[];
}

export class GpuList extends React.Component<IGpuListProps, never> {

  public render() {
    // console.log('render GpuList');
    return (
      <div className="gpu-list">
        {this.props.gpuList.map((gpu, index) => (
          <Gpu
            key={index}
            index={index}
            gpuModelsList={this.props.gpuModelsList}
            showBenchmarks={this.props.showBenchmarks}
            {...gpu}
            onChangeGpuModel={this.props.onChangeGpuModel}
            onChangeGpuCount={this.props.onChangeGpuCount}
            onBlurCount={this.props.onBlurCount}
            onRemoveGpu={this.props.onRemoveGpu}
            onChangeBenchmarks={this.props.onChangeBenchmarks}
          />
        ))}
      </div>
    );
  }
}

export default GpuList;
