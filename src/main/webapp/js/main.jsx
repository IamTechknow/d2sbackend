import React, {Component} from 'react';

import * as ClassData from './class-data.jsx';

export default class MainData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var baseAttr = ClassData[this.props.data.classNum].attributes;
    return (
        <div id="main">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="name">Character Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Up to 15 characters, no numbers" maxLength="15" value={this.props.data.name} onChange={this.props.handler}></input>
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="level">Character Level</label>
                    <input type="number" className="form-control" id="level" name="level" min="1" max="99" value={this.props.data.level} onChange={this.props.handler}></input>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="classNum">Character Class</label>
                <select className="form-control" id="classNum" name="classNum" value={this.props.data.classNum} onChange={this.props.handler}>
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
                    <input type="number" className="form-control" name="gold" id="gold" min="0" value={this.props.data.gold} onChange={this.props.handler}></input>
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="stashed">Stashed Gold</label>
                    <input type="number" className="form-control" name="stashGold" id="stashed" min="0" max="2500000" value={this.props.data.stashGold} onChange={this.props.handler}></input>
                </div>
            </div>

            <p>Attribute points available: {this.props.stats - this.props.data.attr.reduce( ( accum, curr) => accum + curr )}</p>

            {/* Here, the true attribute values should be displayed, and when parsed are subtracted from their base values via the handler */}
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label htmlFor="str">Strength</label>
                    <input type="number" className="attr form-control" name="str" id="str" min="0" value={this.props.data.attr[0] + baseAttr[0]} onChange={this.props.handler}></input>
                    <button type="button" className="btn btn-primary" style={{"marginTop": 10 + "px"}} data-idx="0" data-mode="0" onClick={this.props.btnHandler}>+5</button>
                    <button type="button" className="btn btn-primary" style={{"marginTop": 10 + "px", "marginLeft": 10 + "px"}} data-idx="0" data-mode="1" onClick={this.props.btnHandler}>+All</button>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="dex">Dexterity</label>
                    <input type="number" className="attr form-control" name="dex" id="dex" min="0" value={this.props.data.attr[1] + baseAttr[1]} onChange={this.props.handler}></input>
                    <button type="button" className="btn btn-primary" style={{"marginTop": 10 + "px"}} data-idx="1" data-mode="0" onClick={this.props.btnHandler}>+5</button>
                    <button type="button" className="btn btn-primary" style={{"marginTop": 10 + "px", "marginLeft": 10 + "px"}} data-idx="1" data-mode="1" onClick={this.props.btnHandler}>+All</button>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="vit">Vitality</label>
                    <input type="number" className="attr form-control" name="vit" id="vit" min="0" value={this.props.data.attr[2] + baseAttr[2]} onChange={this.props.handler}></input>
                    <button type="button" className="btn btn-primary" style={{"marginTop": 10 + "px"}} data-idx="2" data-mode="0" onClick={this.props.btnHandler}>+5</button>
                    <button type="button" className="btn btn-primary" style={{"marginTop": 10 + "px", "marginLeft": 10 + "px"}} data-idx="2" data-mode="1" onClick={this.props.btnHandler}>+All</button>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="nrg">Energy</label>
                    <input type="number" className="attr form-control" name="nrg" id="nrg" min="0" value={this.props.data.attr[3] + baseAttr[3]} onChange={this.props.handler}></input>
                    <button type="button" className="btn btn-primary" style={{"marginTop": 10 + "px"}} data-idx="3" data-mode="0" onClick={this.props.btnHandler}>+5</button>
                    <button type="button" className="btn btn-primary" style={{"marginTop": 10 + "px", "marginLeft": 10 + "px"}} data-idx="3" data-mode="1" onClick={this.props.btnHandler}>+All</button>
                </div>
            </div>
        </div>
    );
  }
}
