import * as React from 'react';
import './index.css';
import FormField from '../form-field';
import TextField from '@material-ui/core/TextField';

export interface IBenchmarks {
  ethhash: string;
  equihash200: string;
}

interface IBenchmarksProps extends IBenchmarks {
  onChange: (field: keyof (IBenchmarks), value: string) => void;
}

export class Benchmarks extends React.Component<IBenchmarksProps, never> {
  public render() {
    // console.log('render Benchmarks');
    const p = this.props;
    return (
      <div className="benchmarks">
        <FormField className="benchmarks__field" label="Ethash, Mh/s" horizontal>
          <TextField
            className="benchmarks__input"
            type="number"
            value={p.ethhash}
            name="ethhash"
            onChange={this.handleChange}
          />
        </FormField>
        <FormField className="benchmarks__field" label="Equihash (200_9), H/s" horizontal>
          <TextField
            className="benchmarks__input"
            type="number"
            value={p.equihash200}
            name="equihash200"
            onChange={this.handleChange}
          />
        </FormField>
        {/* <FormField label="Cryptohigh V7, H/s" horizontal>
          <TextField
            className="benchmarks__input"
            value={p.cryptohigh}
            name="cryptohigh"
            onChange={this.handleChange}
          />
        </FormField>
        <FormField label="Equihash (144_5), H/s" horizontal>
          <TextField
            className="benchmarks__input"
            value={p.equihash144}
            name="equihash144"
            onChange={this.handleChange}
          />
        </FormField> */}
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.name as keyof (IBenchmarks), event.target.value);
  };
}

export default Benchmarks;
