import React, {Component} from 'react';

export default class Difficulties extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="normalDifficulty" value="0" defaultChecked></input>
                <label className="form-check-label" htmlFor="normalDifficulty">Normal</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="nightmareDifficulty" value="5"></input>
                <label className="form-check-label" htmlFor="nightmareDifficulty">Nightmare</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="hellDifficulty" value="10"></input>
                <label className="form-check-label" htmlFor="hellDifficulty">Hell</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="difficulty" id="finishedHell" value="15"></input>
                <label className="form-check-label" htmlFor="finishedHell">Completed Hell</label>
            </div>
            <br /> <br />
        </div>
    );
  }
}

