import Button from '../styled/button';
import * as React from 'react';
import './index.css';
import * as cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';

export type TEstimateProfit = [string?, string?, string?];

interface IResultsPanelProps {
  className?: string;
  values: TEstimateProfit;
  onCalculate?: () => void;
}

const CalculateButton = withStyles({
  root: {
    fontWeight: 700,
  },
})(Button);

export class ResultsPanel extends React.PureComponent<IResultsPanelProps, never> {
  private static Labels = ['1 hour', '24 hours', '30 days'];

  private formatValue = (value?: string) => (value === undefined ? '\u2014' : `$ ${value}`);

  private renderValue = (label: string, value: string) => (
    <React.Fragment key={label}>
      <div className="results-panel__cell">{label}:</div>
      <div className="results-panel__cell results-panel__cell-value">{value}</div>
    </React.Fragment>
  );

  private renderValues = () =>
    ResultsPanel.Labels.map((label, i) =>
      this.renderValue(label, this.formatValue(this.props.values[i])),
    );

  public render() {
    // console.log('render ResultsPanel');
    return (
      <div className={cn('results-panel', this.props.className)}>
        <h3 className="results-panel__header">Estimated cost</h3>
        <div className="results-panel__grid">{this.renderValues()}</div>
        <p>* electricity costs are not included</p>
        <CalculateButton
          className="results-panel__calculate-button"
          disabled={this.props.onCalculate === undefined}
          variant="contained"
          color="primary"
          onClick={this.props.onCalculate}
        >
          Calculate
        </CalculateButton>
        <a
          className="results-panel__get-started-link"
          target="_blank"
          href="https://docs.sonm.com/getting-started"
        >
          Get started
        </a>
      </div>
    );
  }
}

export default ResultsPanel;
