import React from 'react';
import PropTypes from 'prop-types';

// Display the quest labels and checkboxes. Use grid layouts to organize them to four quests a row
const Quests = ({ data, handler }) => (
  <div id="questCheckBoxes" className="formKeyLines">
    <div className="d2Grid questGrid">
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="den">
          <input className="rewards form-check-input" type="checkbox" name="den" id="den" checked={data.den} onChange={handler} />
          Completed Den of Evil
        </label>
      </div>
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="imbue">
          <input className="rewards form-check-input" type="checkbox" name="imbue" id="imbue" checked={data.imbue} onChange={handler} />
          Returned Hordaric Malus
        </label>
      </div>
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="skillBook">
          <input className="rewards form-check-input" type="checkbox" name="skillBook" id="skillBook" checked={data.skillBook} onChange={handler} />
          Defeated Radamant
        </label>
      </div>
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="goldenbird">
          <input className="rewards form-check-input" type="checkbox" name="potion" id="goldenbird" checked={data.potion} onChange={handler} />
          Drank the Potion of Life
        </label>
      </div>

      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="lamEsen">
          <input className="rewards form-check-input" type="checkbox" name="lamEsen" id="lamEsen" checked={data.lamEsen} onChange={handler} />
          Completed Lam Esen&apos;s Tome
        </label>
      </div>
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="izual">
          <input className="rewards form-check-input" type="checkbox" name="izual" id="izual" checked={data.izual} onChange={handler} />
          Defeated Izual
        </label>
      </div>
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="socket">
          <input className="rewards form-check-input" type="checkbox" name="socket" id="socket" checked={data.socket} onChange={handler} />
          Socket Reward from Larzuk
        </label>
      </div>
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="scroll">
          <input className="rewards form-check-input" type="checkbox" name="scroll" id="scroll" checked={data.scroll} onChange={handler} />
          Read Scroll of Resistance
        </label>
      </div>

      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="nAncients">
          <input className="rewards form-check-input" type="checkbox" name="nAncients" id="nAncients" checked={data.nAncients} onChange={handler} />
          Normal Ancients
        </label>
      </div>
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="nmAncients">
          <input className="rewards form-check-input" type="checkbox" name="nmAncients" id="nmAncients" checked={data.nmAncients} onChange={handler} />
          Nightmare Ancients
        </label>
      </div>
      <div className="quest form-check-inline">
        <label className="form-check-label" htmlFor="hAncients">
          <input className="rewards form-check-input" type="checkbox" name="hAncients" id="hAncients" checked={data.hAncients} onChange={handler} />
          Hell Ancients
        </label>
      </div>
    </div>
  </div>
);

Quests.propTypes = {
  data: PropTypes.shape({
    den: PropTypes.bool.isRequired,
    imbue: PropTypes.bool.isRequired,
    skillBook: PropTypes.bool.isRequired,
    potion: PropTypes.bool.isRequired,
    lamEsen: PropTypes.bool.isRequired,
    izual: PropTypes.bool.isRequired,
    socket: PropTypes.bool.isRequired,
    scroll: PropTypes.bool.isRequired,
    nAncients: PropTypes.bool.isRequired,
    nmAncients: PropTypes.bool.isRequired,
    hAncients: PropTypes.bool.isRequired,
  }).isRequired,
  handler: PropTypes.func.isRequired,
};

export default Quests;
