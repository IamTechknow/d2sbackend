import React from 'react';
import PropTypes from 'prop-types';

import * as ClassData from './class-data';

const MainData = ({
  classNum, name, level, currAttr, stats, handler, btnHandler,
}) => {
  const baseAttr = ClassData[classNum].attributes;
  const stat = ['Strength', 'Dexterity', 'Vitality', 'Energy'];
  const stat2 = ['str', 'dex', 'vit', 'nrg'];
  return (
    <div id="main">
      <div className="form-row d2Grid entryGrid">
        <div className="form-group entry">
          <span>Character Name</span>
          <input type="text" className="form-control" id="name" name="name" placeholder="Up to 15 characters, no numbers" maxLength="15" value={name} onChange={handler} />
        </div>

        <div className="form-group entry">
          <span>Character Level</span>
          <input type="number" className="form-control" id="level" name="level" min="1" max="99" value={level} onChange={handler} />
        </div>

        <div id="classUi" className="form-group">
          <span>Character Class</span>
          <select className="form-control" id="classNum" name="classNum" value={classNum} onChange={handler}>
            <option value="0">Amazon</option>
            <option value="6">Assassin</option>
            <option value="4">Barbarian</option>
            <option value="5">Druid</option>
            <option value="2">Necromancer</option>
            <option value="3">Paladin</option>
            <option value="1">Sorceress</option>
          </select>
        </div>

        <div className="form-group entry">
          <span>Gold</span>
          <input type="number" className="form-control" name="gold" id="gold" min="0" defaultValue="0" onChange={handler} />
        </div>

        <div className="form-group entry">
          <span>Stashed Gold</span>
          <input type="number" className="form-control" name="stashGold" id="stashed" min="0" max="2500000" defaultValue="0" onChange={handler} />
        </div>
      </div>

      <p>
        Attribute points available:&nbsp;
        {stats - currAttr.reduce((accum, curr) => accum + curr)}
      </p>

      {/* Here, the true attribute values should be displayed,
      and when parsed are subtracted from their base values via the handler */}
      <div className="form-row d2Grid attrGrid">
        {baseAttr.map((attr, i) => (
          <div key={stat[i]} className="form-group attr_ui">
            <span>{stat[i]}</span>
            <input type="number" className="attr form-control" name={stat2[i]} id={stat2[i]} min="0" value={currAttr[i] + attr} onChange={handler} />
            <button type="button" className="btn btn-primary" style={{ marginTop: `${10}px` }} data-idx={`${i}`} data-mode="0" onClick={btnHandler}>+5</button>
            <button type="button" className="btn btn-primary" style={{ marginTop: `${10}px`, marginLeft: `${10}px` }} data-idx={`${i}`} data-mode="1" onClick={btnHandler}>+All</button>
          </div>
        ))}
      </div>
    </div>
  );
};

MainData.propTypes = {
  classNum: PropTypes.number.isRequired,
  name: PropTypes.string,
  level: PropTypes.number.isRequired,
  currAttr: PropTypes.arrayOf(PropTypes.number).isRequired,
  stats: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
  btnHandler: PropTypes.func.isRequired,
};

MainData.defaultProps = {
  name: '',
};

export default MainData;
