

```js
const { gpuModelsList } = require('../../data');

const gpuList = [
  { modelIndex: 0, count: 1 },
  { modelIndex: 3, count: 4 },
  { modelIndex: 6, count: 2 },
  { modelIndex: 9, count: 1 },
];

<GpuList
  gpuModelsList={gpuModelsList}
  gpuList={gpuList}
/>
```