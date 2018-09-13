import React, {Component} from 'react';

export default class Difficulties extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var diff = this.props.data.difficulty;
    return (
      <div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="difficulty" id="norm" checked={diff === "0"} onChange={this.props.handler} value="0"></input>
          <label className="form-check-label" htmlFor="norm">Normal</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="difficulty" id="nm" checked={diff === "5"} onChange={this.props.handler} value="5"></input>
          <label className="form-check-label" htmlFor="nm">Nightmare</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="difficulty" id="h" checked={diff === "10"} onChange={this.props.handler} value="10"></input>
          <label className="form-check-label" htmlFor="h">Hell</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="difficulty" id="beatH" checked={diff === "15"} onChange={this.props.handler} value="15"></input>
          <label className="form-check-label" htmlFor="beatH">Completed Hell</label>
        </div>
        <br /> <br />
      </div>
    );
  }
}
