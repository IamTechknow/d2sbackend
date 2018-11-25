import React from 'react';
import PropTypes from 'prop-types';

const acts = [{ id: 'act1', val: 0 }, { id: 'act2', val: 1 }, { id: 'act3', val: 2 }, { id: 'act4', val: 3 }, { id: 'act5', val: 4 }];

// Constructs the Radio button group for all five acts
const Acts = ({ currAct, handler }) => (
  <div className="formKeyLines">
    {acts.map(act => (
      <div key={act.id} className="form-check form-check-inline">
        <label className="form-check-label" htmlFor={act.id}>
          <input className="form-check-input" type="radio" name="startingAct" id={act.id} value={act.val} checked={currAct === act.val} onChange={handler} />
          {`Act ${act.val + 1}`}
        </label>
      </div>
    ))}
  </div>
);

Acts.propTypes = {
  currAct: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Acts;
