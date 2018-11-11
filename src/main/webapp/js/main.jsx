import React, { Component } from 'react';

import * as ClassData from './class-data.jsx';

const MainData = (props) => {
  const baseAttr = ClassData[props.data.classNum].attributes;
  const stat = ['Strength', 'Dexterity', 'Vitality', 'Energy'];
  const stat2 = ['str', 'dex', 'vit', 'nrg'];
  return (
    <div id="main">
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="name">Character Name</label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Up to 15 characters, no numbers" maxLength="15" value={props.data.name} onChange={props.handler} />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="level">Character Level</label>
          <input type="number" className="form-control" id="level" name="level" min="1" max="99" value={props.data.level} onChange={props.handler} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="classNum">Character Class</label>
        <select className="form-control" id="classNum" name="classNum" value={props.data.classNum} onChange={props.handler}>
          <option value="0">Amazon</option>
          <option value="6">Assassin</option>
          <option value="4">Barbarian</option>
          <option value="5">Druid</option>
          <option value="2">Necromancer</option>
          <option value="3">Paladin</option>
          <option value="1">Sorceress</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="gold">Gold</label>
          <input type="number" className="form-control" name="gold" id="gold" min="0" value={props.data.gold} onChange={props.handler} />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="stashed">Stashed Gold</label>
          <input type="number" className="form-control" name="stashGold" id="stashed" min="0" max="2500000" value={props.data.stashGold} onChange={props.handler} />
        </div>
      </div>

      <p>
Attribute points available:
        {props.stats - props.data.attr.reduce((accum, curr) => accum + curr)}
      </p>

      {/* Here, the true attribute values should be displayed, and when parsed are subtracted from their base values via the handler */}
      <div className="form-row">
        {baseAttr.map((attr, i) => (
          <div key={i} className="form-group col-md-3">
            <label htmlFor="str">{stat[i]}</label>
            <input type="number" className="attr form-control" name={stat2[i]} id={stat2[i]} min="0" value={props.data.attr[0] + attr} onChange={props.handler} />
            <button type="button" className="btn btn-primary" style={{ marginTop: `${10}px` }} data-idx={`${i}`} data-mode="0" onClick={props.btnHandler}>+5</button>
            <button type="button" className="btn btn-primary" style={{ marginTop: `${10}px`, marginLeft: `${10}px` }} data-idx={`${i}`} data-mode="1" onClick={props.btnHandler}>+All</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainData;
