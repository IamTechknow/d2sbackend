import React from 'react';
import PropTypes from 'prop-types';

const Options = ({ data, handler }) => (
  <div>
    <div className="form-check form-check-inline">
      <label className="form-check-label" htmlFor="exp">
        <input className="opts form-check-input" type="checkbox" name="expansion" id="exp" checked={data.expansion} onChange={handler} />
        Expansion
      </label>
    </div>
    <div className="form-check form-check-inline">
      <label className="form-check-label" htmlFor="hc">
        <input className="opts form-check-input" type="checkbox" name="hardcore" id="hc" checked={data.hardcore} onChange={handler} />
        Hardcore
      </label>
    </div>
    <div className="form-check form-check-inline">
      <label className="form-check-label" htmlFor="rejuvs">
        <input className="opts form-check-input" type="checkbox" name="rejuvs" id="rejuvs" checked={data.rejuvs} onChange={handler} />
        Add Rejuvs to Belt
      </label>
    </div>
  </div>
);

Options.propTypes = {
  data: PropTypes.shape({
    expansion: PropTypes.bool.isRequired,
    hardcore: PropTypes.bool.isRequired,
    rejuvs: PropTypes.bool.isRequired,
  }).isRequired,
  handler: PropTypes.func.isRequired,
};

export default Options;
