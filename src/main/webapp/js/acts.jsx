import React, {Component} from 'react';

export default class Acts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="startingAct" id="act1" value="0" defaultChecked></input>
                <label className="form-check-label" htmlFor="act1">Act 1</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="startingAct" id="act2" value="1"></input>
                <label className="form-check-label" htmlFor="act2">Act 2</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="startingAct" id="act3" value="2"></input>
                <label className="form-check-label" htmlFor="act3">Act 3</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="startingAct" id="act4" value="3"></input>
                <label className="form-check-label" htmlFor="act4">Act 4</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="startingAct" id="act5" value="4"></input>
                <label className="form-check-label" htmlFor="act5">Act 5</label>
            </div>
            <br /> <br />
        </div>
    );
  }
}

