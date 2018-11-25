import React from 'react';
import PropTypes from 'prop-types';

const Options = ({ handler }) => (
  <div className="formKeyLines">
    <div className="form-check form-check-inline">
      <label className="form-check-label" htmlFor="exp">
        <input className="opts form-check-input" type="checkbox" name="expansion" id="exp" defaultChecked onChange={handler} />
        Expansion
      </label>
    </div>
    <div className="form-check form-check-inline">
      <label className="form-check-label" htmlFor="hc">
        <input className="opts form-check-input" type="checkbox" name="hardcore" id="hc" onChange={handler} />
        Hardcore
      </label>
    </div>
    <div className="form-check form-check-inline">
      <label className="form-check-label" htmlFor="rejuvs">
        <input className="opts form-check-input" type="checkbox" name="rejuvs" id="rejuvs" onChange={handler} />
        Add Rejuvs to Belt
      </label>
    </div>
  </div>
);

Options.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default Options;
