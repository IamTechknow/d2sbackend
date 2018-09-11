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
                    <input className="rewards form-check-input" type="checkbox" name="den" id="den" checked={this.props.data.den} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="den">Completed Den of Evil for Skill Point and Stats reset</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="imbue" id="imbue" checked={this.props.data.imbue} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="imbue">Returned Hordaric Malus</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="skillBook" id="skillBook" checked={this.props.data.skillBook} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="skillBook">Defeated Radamant for Skill Point</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="potion" id="goldenbird" checked={this.props.data.potion} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="goldenbird">Drank the Potion of Life</label>
                </div>
            </div>
            <div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="lamEsen" id="lamEsen" checked={this.props.data.lamEsen} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="lamEsen">Completed Lam Esen's Tome for five attribute points</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="izual" id="izual" checked={this.props.data.izual} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="izual">Defeated Izual for two skill points</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="socket" id="socket" checked={this.props.data.socket} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="socket">Socket Reward from Larzuk</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="scroll" id="scroll" checked={this.props.data.scroll} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="scroll">Read the Scroll of Resistance</label>
                </div>
            </div>
            <div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="nAncients" id="nAncients" checked={this.props.data.nAncients} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="nAncients">Normal Ancients</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="nmAncients" id="nmAncients" checked={this.props.data.nmAncients} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="nmAncients">Nightmare Ancients</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="rewards form-check-input" type="checkbox" name="hAncients" id="hAncients" checked={this.props.data.hAncients} onChange={this.props.formHandler}></input>
                    <label className="form-check-label" htmlFor="hAncients">Hell Ancients</label>
                </div>
            </div>
            <br />
        </div>
    );
  }
}

