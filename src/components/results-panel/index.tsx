import Button from '@material-ui/core/Button';
import * as React from 'react';
import './index.css';

export type TEstimateProfit = [string?, string?, string?];

interface IResultsPanelProps {
  values: TEstimateProfit;
  onCalculate: () => void;
}

export class ResultsPanel extends React.Component<IResultsPanelProps, never> {
  private static Labels = ['1 hour', '24 hour', '30 days'];

  private formatValue = (value?: string) => (value === undefined ? '\u2014' : `$ ${value}`);

  private renderValue = (label: string, value: string) => (
    <React.Fragment>
      <div>{label}:</div>
      <div>{value}</div>
    </React.Fragment>
  );

  private renderValues = () =>
    ResultsPanel.Labels.map((label, i) =>
      this.renderValue(label, this.formatValue(this.props.values[i])),
    );

  public render() {
    return (
      <div className="results-panel">
        <h3>Estimated income</h3>
        <div className="results-panel__grid">{this.renderValues()}</div>
        <p>* electricity costs are not included</p>
        <Button onClick={this.props.onCalculate}>Calculate</Button>
      </div>
    );
  }
}

export default ResultsPanel;
