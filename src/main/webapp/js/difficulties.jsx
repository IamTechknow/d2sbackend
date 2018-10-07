import React, {Component} from 'react';

var Difficulties = (props) => (
  <div>
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name="difficulty" id="norm" checked={props.diff === "0"} onChange={props.handler} value="0"></input>
      <label className="form-check-label" htmlFor="norm">Normal</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name="difficulty" id="nm" checked={props.diff === "5"} onChange={props.handler} value="5"></input>
      <label className="form-check-label" htmlFor="nm">Nightmare</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name="difficulty" id="h" checked={props.diff === "10"} onChange={props.handler} value="10"></input>
      <label className="form-check-label" htmlFor="h">Hell</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name="difficulty" id="beatH" checked={props.diff === "15"} onChange={props.handler} value="15"></input>
      <label className="form-check-label" htmlFor="beatH">Completed Hell</label>
    </div>
    <br /> <br />
  </div>
);

export default Difficulties;
