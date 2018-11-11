import React from 'react';
import PropTypes from 'prop-types';

import * as ClassData from './class-data';

const MainData = ({
  data, stats, handler, btnHandler,
}) => {
  const baseAttr = ClassData[data.classNum].attributes;
  const stat = ['Strength', 'Dexterity', 'Vitality', 'Energy'];
  const stat2 = ['str', 'dex', 'vit', 'nrg'];
  return (
    <div id="main">
      <div className="form-row">
        <div className="form-group col-md-6">
          <span htmlFor="name">Character Name</span>
          <input type="text" className="form-control" id="name" name="name" placeholder="Up to 15 characters, no numbers" maxLength="15" value={data.name} onChange={handler} />
        </div>

        <div className="form-group col-md-6">
          <span htmlFor="level">Character Level</span>
          <input type="number" className="form-control" id="level" name="level" min="1" max="99" value={data.level} onChange={handler} />
        </div>
      </div>

      <div className="form-group">
        <span htmlFor="classNum">Character Class</span>
        <select className="form-control" id="classNum" name="classNum" value={data.classNum} onChange={handler}>
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
          <span htmlFor="gold">Gold</span>
          <input type="number" className="form-control" name="gold" id="gold" min="0" defaultValue="0" onChange={handler} />
        </div>

        <div className="form-group col-md-6">
          <span htmlFor="stashed">Stashed Gold</span>
          <input type="number" className="form-control" name="stashGold" id="stashed" min="0" max="2500000" defaultValue="0" onChange={handler} />
        </div>
      </div>

      <p>
        Attribute points available:&nbsp;
        {stats - data.attr.reduce((accum, curr) => accum + curr)}
      </p>

      {/* Here, the true attribute values should be displayed,
      and when parsed are subtracted from their base values via the handler */}
      <div className="form-row">
        {baseAttr.map((attr, i) => (
          <div className="form-group col-md-3">
            <span>{stat[i]}</span>
            <input type="number" className="attr form-control" name={stat2[i]} id={stat2[i]} min="0" value={data.attr[0] + attr} onChange={handler} />
            <button type="button" className="btn btn-primary" style={{ marginTop: `${10}px` }} data-idx={`${i}`} data-mode="0" onClick={btnHandler}>+5</button>
            <button type="button" className="btn btn-primary" style={{ marginTop: `${10}px`, marginLeft: `${10}px` }} data-idx={`${i}`} data-mode="1" onClick={btnHandler}>+All</button>
          </div>
        ))}
      </div>
    </div>
  );
};

MainData.propTypes = {
  data: PropTypes.shape({
    classNum: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
    stashGold: PropTypes.number.isRequired,
    attr: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  stats: PropTypes.arrayOf(PropTypes.number).isRequired,
  handler: PropTypes.func.isRequired,
  btnHandler: PropTypes.func.isRequired,
};

export default MainData;
