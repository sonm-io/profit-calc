import Button from '../styled/button';
import * as React from 'react';
import './index.css';
import * as cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DownImg } from './down';

export type TEstimateProfit = [string?, string?, string?] | 'no-plans-found' | 'server-failed';

interface IResultsPanelProps {
  className?: string;
  values: TEstimateProfit;
  onCalculate?: () => void;
  showTrySonm: boolean;
}

const CalculateButton = withStyles({
  root: {
    fontWeight: 700,
  },
})(Button);

export class ResultsPanel extends React.PureComponent<IResultsPanelProps, never> {
  private static Labels = ['1 hour', '24 hours', '30 days'];

  private handleTrySonmClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const frame = document.getElementById('try-sonm-frame') as any;
    frame.src = "https://sonm-public-store.ams3.cdn.digitaloceanspaces.com/sonmos/sonmos.img";
  }

  private formatValue = (value?: string) => (value === undefined ? '\u2014' : `$ ${value}`);

  private renderValue = (label: string, value: string) => (
    <React.Fragment key={label}>
      <div className="results-panel__cell">{label}:</div>
      <div className="results-panel__cell results-panel__cell-value">{value}</div>
    </React.Fragment>
  );

  private renderValues = () =>
    <div className="results-panel__values">
      {ResultsPanel.Labels.map((label, i) =>
        this.renderValue(label, this.formatValue(this.props.values[i])),
      )}
      <p className="results-panel__hint-message">* electricity costs are not included</p>
    </div>

  private renderNoPlansFound = () => 
    <div className="results-panel__no-plans">
        There are no orders for the specified configuration. Please try another configuration.
    </div>

  private renderServerFailed = () => 
    <div className="results-panel__server-failed">
        Server failed. Try again later or set another configuration. 
    </div>

  private renderResult = () => {
    const values = this.props.values;
    return values === 'no-plans-found'
      ? this.renderNoPlansFound()
      : values === 'server-failed'
        ? this.renderServerFailed()
        : this.renderValues();
  }
  
  private renderMain() {
    return (
      <div className="results-panel__main">
        <h3 className="results-panel__header">Price estimate</h3>
        {this.renderResult()}
        <div className="results-panel__calculate">
          <CalculateButton
            className="results-panel__calculate-button"
            disabled={this.props.onCalculate === undefined}
            variant="contained"
            color="primary"
            onClick={this.props.onCalculate}
          >
            Calculate
          </CalculateButton>
          {/* <a
            className="results-panel__get-started-link"
            target="_blank"
            href="https://docs.sonm.com/getting-started"
          >
            Try it!
          </a> */}
        </div>
      </div>
    );
  }

  private renderTrySonm () {
    return (
      <a
        className="results-panel__try"
        target="_brank"
        href="https://sonm.com/sonm-os-download"
        onClick={this.handleTrySonmClick}            
      >
        <div className="results-panel__try-left-block">
          <div className="results-panel__try-header">Sounds promising, huh?</div>
          <div>Try SONM OS.</div>
        </div>
        <DownImg />
      </a>
    );
  }

  public render () {
    return (
      <div className={cn('results-panel', this.props.className)}>
        {this.renderMain()}
        {this.props.showTrySonm ? this.renderTrySonm() : null}
      </div>
    );
  }
}

export default ResultsPanel;
