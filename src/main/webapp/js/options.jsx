import React, {Component} from 'react';

export default class Options extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="form-check form-check-inline">
          <input className="opts form-check-input" type="checkbox" name="expansion" id="exp" checked={this.props.data.expansion} onChange={this.props.handler}></input>
          <label className="form-check-label" htmlFor="exp">Expansion</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="opts form-check-input" type="checkbox" name="hardcore" id="hc" checked={this.props.data.hardcore} onChange={this.props.handler}></input>
          <label className="form-check-label" htmlFor="hc">Hardcore</label>
        </div>
        <br /> <br />
      </div>
    );
  }
}
