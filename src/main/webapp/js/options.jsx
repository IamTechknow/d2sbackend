import React, {Component} from 'react';

export default class Options extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="expansion" id="exp" defaultChecked></input>
                <label className="form-check-label" htmlFor="exp">Expansion</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="hardcore" id="hc"></input>
                <label className="form-check-label" htmlFor="hc">Hardcore</label>
            </div>
        </div>
    );
  }
}

