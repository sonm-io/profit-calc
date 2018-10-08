```jsx
const React = require('react');

const { gpuModelsList } = require('../../data');

class Container extends React.Component {
  constructor() {
    this.state = {
      selectedGpu: undefined,
      count: 1,
    };

    this.handleSelectGpu = this.handleSelectGpu.bind(this);
    this.handleChangeCount = this.handleChangeCount.bind(this);
  }

  handleSelectGpu(selectedIndex) {
    this.setState({ selectedIndex });
  }

  handleChangeCount(count) {
    this.setState({ count });
  }

  render() {
    return (
      <Gpu
        gpuModelsList={gpuModelsList}
        selectedGpu={this.state.selectedGpu}
        count={this.state.count}
        onSelectGpu={this.handleSelectGpu}
        onChangeCount={this.handleChangeCount}
      />
    );
  }
}

<Container />;
```
