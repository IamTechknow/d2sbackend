import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

import ItemData from './item-data';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleChangeFor = this.handleChangeFor.bind(this);
    this.onSubTypeChange = this.onSubTypeChange.bind(this);

    this.state = {
      randomAttr: false,
      ethernal: false,
      currSubType: ItemData["primary"][0],
    };
  }

  // Higher-order function to forego binding
  handleChangeFor(name) {
    return (event) => {
      this.setState({ [name]: event.target.checked });
    };
  }

  onSubTypeChange(event) {
    this.setState({
      currSubType : event.target.value
    });
  }

  renderOptionsFor(type) {
    return ItemData[type].map(opt => (
      <option key={opt}>{opt}</option>
    ));
  }

  render() {
    const { currSubType } = this.state;
    return (
      <Paper style={{ padding: '16px' }}>
        <div className="d2Grid dashboardGrid">
          <div className="entry">
            <h3 className="storageHeader">Current item</h3>
            <div className="pickedUpItem" />
          </div>
          <div id="dashboard">
            <h3 className="storageHeader">Item creation</h3>
            <ul className="list-group">
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Type</span>
                <select id="primaryType" className="form-control" onChange={this.onSubTypeChange}>
                  {
                    this.renderOptionsFor("primary")
                  }
                </select>
                <select id="subType" className="form-control">
                  {
                    this.renderOptionsFor(currSubType)
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Quality</span>
                <select className="form-control dashboardOpt">
                  {
                    this.renderOptionsFor("quality")
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Rarity</span>
                <select className="form-control dashboardOpt">
                  {
                    this.renderOptionsFor("rarity")
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Random attribute values</span>
                <Switch
                  checked={this.state.randomAttr}
                  onChange={this.handleChangeFor('randomAttr')}
                  color="primary"
                />
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Ethernal</span>
                <Switch
                  checked={this.state.ethernal}
                  onChange={this.handleChangeFor('ethernal')}
                  color="primary"
                />
              </li>
            </ul>
          </div>
        </div>
      </Paper>
    );
  }
}
