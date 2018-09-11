import React, {Component} from 'react';

export default class MainData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="main">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="charName">Character Name</label>
                    <input type="text" className="form-control" id="charName" name="name" placeholder="Up to 15 characters, no numbers" maxLength="15" value={this.props.data.name} onChange={this.props.formHandler}></input>
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="charLevel">Character Level</label>
                    <input type="number" className="form-control" id="charLevel" name="level" min="1" max="99" value={this.props.data.level} onChange={this.props.formHandler}></input>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="classNum">Character Class</label>
                <select className="form-control" id="classNum" name="classNum" value={this.props.data.classNum} onChange={this.props.formHandler}>
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
                    <input type="number" className="form-control" name="gold" id="gold" min="0" value={this.props.data.gold} onChange={this.props.formHandler}></input>
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="stashedGold">Stashed Gold</label>
                    <input type="number" className="form-control" name="stashGold" id="stashedGold" min="0" max="2500000" value={this.props.data.stashGold} onChange={this.props.formHandler}></input>
                </div>
            </div>
        </div>
    );
  }
}

