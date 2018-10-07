import React, {Component} from 'react';

var Options = (props) => (
  <div>
    <div className="form-check form-check-inline">
      <input className="opts form-check-input" type="checkbox" name="expansion" id="exp" checked={props.data.expansion} onChange={props.handler}></input>
      <label className="form-check-label" htmlFor="exp">Expansion</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="opts form-check-input" type="checkbox" name="hardcore" id="hc" checked={props.data.hardcore} onChange={props.handler}></input>
      <label className="form-check-label" htmlFor="hc">Hardcore</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="opts form-check-input" type="checkbox" name="rejuvs" id="rejuvs" checked={props.data.rejuvs} onChange={props.handler}></input>
      <label className="form-check-label" htmlFor="rejuvs">Add Rejuvs to Belt</label>
    </div>
    <br /> <br />
  </div>
);

export default Options;
