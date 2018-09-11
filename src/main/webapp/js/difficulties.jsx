import React, {Component} from 'react';

export default class Difficulties extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="normalDifficulty" checked={this.props.data.difficulty === "0"} onChange={this.props.formHandler} value="0"></input>
                <label className="form-check-label" htmlFor="normalDifficulty">Normal</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="nightmareDifficulty" checked={this.props.data.difficulty === "5"} onChange={this.props.formHandler} value="5"></input>
                <label className="form-check-label" htmlFor="nightmareDifficulty">Nightmare</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="hellDifficulty" checked={this.props.data.difficulty === "10"} onChange={this.props.formHandler} value="10"></input>
                <label className="form-check-label" htmlFor="hellDifficulty">Hell</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="finishedHell" checked={this.props.data.difficulty === "15"} onChange={this.props.formHandler} value="15"></input>
                <label className="form-check-label" htmlFor="finishedHell">Completed Hell</label>
            </div>
            <br /> <br />
        </div>
    );
  }
}

