import * as React from 'react';
import './index.css';
import FormField from '../form-field';
import TextField from '@material-ui/core/TextField';

interface IBenchmarks {
  ethhash: string;
  equihash200: string;
}

interface IBenchmarksProps extends IBenchmarks {
  onChange: (field: keyof (IBenchmarks), value: string) => void;
}

class Benchmarks extends React.Component<IBenchmarksProps, never> {
  public render() {
    const p = this.props;
    return (
      <div className="benchmarks">
        <h3 className="benchmarks__header">Mining algo benchmarks</h3>
        <FormField label="Ethash, Mh/s" horizontal>
          <TextField
            className="benchmarks__input"
            value={p.ethhash}
            name="ethhash"
            onChange={this.handleChange}
          />
        </FormField>
        <FormField className="benchmarks__col2" label="Equihash (200_9), H/s" horizontal>
          <TextField
            className="benchmarks__input"
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
