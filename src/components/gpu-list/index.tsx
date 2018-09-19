import * as React from 'react';
import { Gpu, IGpuEvents } from '../gpu';
import { ISelectListItem } from '../types';
import './index.css';

export type TGpuList = Array<{
  modelIndex: number;
  count?: number;
}>;

export interface IGpuListProps extends IGpuEvents {
  gpuModelsList: ISelectListItem[];
  gpuList: TGpuList;
}

interface IState {
  gpuList: Array<{
    model: ISelectListItem;
    count?: number;
  }>;
}

export class GpuList extends React.Component<IGpuListProps, IState> {
  public static getDerivedStateFromProps(props: IGpuListProps): IState {
    const gpuList = props.gpuList.map(gpu => ({
      model: props.gpuModelsList[gpu.modelIndex],
      count: gpu.count,
    }));
    return { gpuList };
  }

  public render() {
    return (
      <div className="gpu-list">
        {this.state.gpuList.map((gpu, index) => (
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
