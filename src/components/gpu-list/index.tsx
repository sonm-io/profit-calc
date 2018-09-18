import * as React from 'react';
import { Gpu } from '../gpu';
import { ISelectListItem } from '../types';
import './index.css';

export interface IGpuListProps {
  gpuModelsList: ISelectListItem[];
  gpuList: Array<{
    modelIndex: number;
    count: number;
  }>;
  onChangeGpu: (listIndex: number, selectedItem: ISelectListItem) => void;
  onChangeCount: (listIndex: number, value?: number) => void;
  onClose: (listIndex: number) => void;
}

interface IState {
  gpuList: Array<{
    model: ISelectListItem;
    count: number;
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
            key={gpu.model.value}
            index={index}
            gpuModelsList={this.props.gpuModelsList}
            selectedGpu={gpu.model}
            count={gpu.count}
            onChangeGpu={this.props.onChangeGpu}
            onChangeCount={this.props.onChangeCount}
            onClose={this.props.onClose}
          />
        ))}
      </div>
    );
  }
}

export default GpuList;
