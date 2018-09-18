import Button from '@material-ui/core/Button';
import * as React from 'react';
import './index.css';

class ResultsPanel extends React.Component {
  public render() {
    return (
      <div className="results-panel">
        <h3>Estimated income</h3>
        <div className="results-panel__grid">
          <div>1 hour:</div><div>&mdash;</div>
          <div>24 hour:</div><div>&mdash;</div>
          <div>30 days:</div><div>&mdash;</div>
        </div>
        <p>* electricity costs are not included</p>
        <Button>Calculate</Button>
      </div>
    );
  }
}

export default ResultsPanel;
