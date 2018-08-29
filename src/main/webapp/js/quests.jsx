import React, {Component} from 'react';

// Display the quest labels and checkboxes
export default class Quests extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="questCheckBoxes">
            <div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.den" id="den"></input>
                    <label className="form-check-label" htmlFor="den">Completed Den of Evil for Skill Point and Stats reset</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.imbue" id="imbue"></input>
                    <label className="form-check-label" htmlFor="imbue">Returned Hordaric Malus</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.skillBook" id="skillBook"></input>
                    <label className="form-check-label" htmlFor="skillBook">Defeated Radamant for Skill Point</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.potion" id="goldenbird"></input>
                    <label className="form-check-label" htmlFor="goldenbird">Drank the Potion of Life</label>
                </div>
            </div>
            <div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.lamEsen" id="lamEsen"></input>
                    <label className="form-check-label" htmlFor="lamEsen">Completed Lam Esen's Tome for five attribute points</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.izual" id="izual"></input>
                    <label className="form-check-label" htmlFor="izual">Defeated Izual for two skill points</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.socket" id="socket"></input>
                    <label className="form-check-label" htmlFor="socket">Socket Reward from Larzuk</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.scroll" id="scroll"></input>
                    <label className="form-check-label" htmlFor="scroll">Read the Scroll of Resistance</label>
                </div>
            </div>
            <div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.nAncients" id="nAncients"></input>
                    <label className="form-check-label" htmlFor="nAncients">Normal Ancients</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.nmAncients" id="nmAncients"></input>
                    <label className="form-check-label" htmlFor="nmAncients">Nightmare Ancients</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="rewards.hAncients" id="hAncients"></input>
                    <label className="form-check-label" htmlFor="hAncients">Hell Ancients</label>
                </div>
            </div>
            <br />
        </div>
    );
  }
}

