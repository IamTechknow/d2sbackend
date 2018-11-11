import React from 'react';
import PropTypes from 'prop-types';

const diffs = [{ id: 'norm', val: 0, txt: 'Normal' }, { id: 'nm', val: 5, txt: 'Nightmare' },
  { id: 'h', val: 10, txt: 'Hell' }, { id: 'beatH', val: 15, txt: 'Completed Hell' }];

const Difficulties = ({ currDiff, handler }) => (
  <div>
    {diffs.map(diff => (
      <div key={diff.id} className="form-check form-check-inline">
        <label className="form-check-label" htmlFor={diff.id}>
          <input className="form-check-input" type="radio" name="difficulty" id={diff.id} checked={currDiff === diff.val} onChange={handler} value={diff.val} />
          {diff.txt}
        </label>
      </div>
    ))}
  </div>
);

Difficulties.propTypes = {
  currDiff: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Difficulties;
