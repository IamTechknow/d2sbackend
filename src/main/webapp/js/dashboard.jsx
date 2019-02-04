import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ItemData from './item-data';

const IMG_PREFIX = '';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleChangeFor = this.handleChangeFor.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.rarityRef = React.createRef();

    this.state = {
      randomAttr: false,
      ethernal: false,
      currType: ItemData['primary'][0],
      currSubType: ItemData[ItemData['primary'][0]][0],
      currQuality: ItemData['quality'][0],
      currRarity: ItemData['rarity'][0]
    };
  }

  static concatDataFor(type, rarity) {
    return ItemData["quality"].slice(1)
      .reduce((accum, curr) => {
        const group = type + curr + rarity;
        return accum.concat(ItemData[group] ? ItemData[group] : []);
      }, []);
  }

  static getDataArray(type, subType, quality, rarity, group) {
    // Use one array or concat all. Fail gracefully if data doesn't exist
    return !Dashboard.isRarityDisabled(type) && quality === 'All' ?
      Dashboard.concatDataFor(subType, rarity) : (ItemData[group] ? ItemData[group] : []);
  }

  static getGroup(type, subType, quality, rarity) {
    // Jewelry and misc items don't have quality/rarity
    if(type === 'Jewelry') {
      return type;
    } else if(type === 'Miscellaneous') {
      return subType;
    } else {
      return subType + quality + rarity;
    }
  }

  static getImgClasses(type, subType) {
    let result = 'pickedUpImg ';

    switch(subType) {
      case 'Belts':
        return result + 'pickedUp1x2';
      case 'Gloves':
        return result + 'pickedUp2x2';
      default:
        return result + 'pickedUp1x1';
    }
  }

  // Should quality and rarity select elements be disabled?
  static isRarityDisabled(currType) {
    return currType === 'Miscellaneous' || currType === 'Jewelry';
  }

  // Higher-order function to forego binding
  handleChangeFor(name) {
    return (event) => {
      this.setState({ [name]: event.target.checked });
    };
  }

  onSelectChange(event) {
    const { currType, currSubType, currQuality, currRarity, prevType, prevSub } = this.state;
    const newTypes = {
      [event.target.id] : event.target.value
    };

    // Account for new primary type, change subtype, rarity
    if (event.target.id === 'currType') {
      const extras = {
        currSubType : event.target.value !== prevType ? ItemData[event.target.value][0] : prevSub,
        prevSub : currSubType,
        prevType: currType
      };

      if (Dashboard.isRarityDisabled(event.target.value)) {
        extras['currRarity'] = ItemData['rarity'][0];
      }

      Object.assign(newTypes, extras);
    }

    // Change current item. If rarity should be on, use rarity from select element
    const newRarity = this.rarityRef.current.value;
    const newType = event.target.id === 'currType' ? newTypes.currType : currType;
    const newSubType = event.target.id === 'currType' || event.target.id === 'currSubType'
      ? newTypes.currSubType : currSubType;

    if (!newTypes['currItemId']) {
      if (!Dashboard.isRarityDisabled(newType)) {
        const group = Dashboard.getGroup(newType, newSubType, currQuality, newRarity);
        const data = Dashboard.getDataArray(newType, newSubType, currQuality, newRarity, group);
        newTypes['currRarity'] = newRarity;
        newTypes['currItemId'] = data.length ? data[0].id : undefined;
      } else {
        const group = Dashboard.getGroup(newType, newSubType, currQuality, newTypes.currRarity);
        newTypes['currItemId'] = ItemData[group][0].id;
      }
    }

    this.setState(newTypes);
  }

  renderItemOptions() {
    const { currType, currSubType, currQuality, currRarity } = this.state;
    let group = Dashboard.getGroup(currType, currSubType, currQuality, currRarity);
    let array = Dashboard.getDataArray(currType, currSubType, currQuality, currRarity, group);

    return array.map(obj => (
      <option key={obj.id} value={obj.id}>{obj.name}</option>
    ));
  }

  renderOptionsFor(type) {
    return ItemData[type].map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ));
  }

  render() {
    const { currType, currSubType, currRarity, currItemId } = this.state;
    const imagePrefix = currRarity === 'Unique' ? 'u' : currRarity === 'Set' ? 's' : '';
    const imgClasses = Dashboard.getImgClasses(currType, currSubType);

    return (
      <Paper style={{ padding: '16px' }}>
        <div className="d2Grid dashboardGrid">
          <div className="entry">
            <h3 className="storageHeader">Current item</h3>
            <div className="pickedUpItem">
              {
                currItemId
                  && <img className={imgClasses} src={`${IMG_PREFIX}${imagePrefix}${currItemId}.png`} />
              }
            </div>
          </div>
          <div id="dashboard">
            <h3 className="storageHeader">Item creation</h3>
            <ul className="list-group">
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Type</span>
                <select id="currType" className="form-control" onChange={this.onSelectChange}>
                  {
                    this.renderOptionsFor("primary")
                  }
                </select>
                <select
                  id="currSubType"
                  className="form-control"
                  onChange={this.onSelectChange}
                  value={currSubType}>
                  {
                    this.renderOptionsFor(currType)
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Quality</span>
                <select
                  id="currQuality"
                  className="form-control dashboardOpt"
                  onChange={this.onSelectChange}
                  disabled={Dashboard.isRarityDisabled(currType)}>
                  {
                    this.renderOptionsFor("quality")
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Rarity</span>
                <select
                  id="currRarity"
                  ref={this.rarityRef}
                  className="form-control dashboardOpt"
                  onChange={this.onSelectChange}
                  disabled={Dashboard.isRarityDisabled(currType)}>
                  {
                    this.renderOptionsFor("rarity")
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Item</span>
                <select id="currItemId"
                  className="form-control dashboardOpt"
                  onChange={this.onSelectChange}
                  value={currItemId}>
                  {
                    this.renderItemOptions()
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Runeword</span>
                <select id="currRW"
                  className="form-control dashboardOpt"
                  onChange={this.onSelectChange}
                  disabled={Dashboard.isRarityDisabled(currType)}>
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Options</span>
                <span className="dashboardItem"></span>
                <FormControlLabel control={<Switch
                  checked={this.state.randomAttr}
                  onChange={this.handleChangeFor('randomAttr')}
                  color="primary" />}
                  label="Random attribute values"
                />
                <FormControlLabel control={<Switch
                  checked={this.state.ethernal}
                  onChange={this.handleChangeFor('ethernal')}
                  color="primary"/>}
                  label="Ethernal"
                />
                <FormControlLabel control={<Switch
                  checked={this.state.ethernal}
                  onChange={this.handleChangeFor('inferior')}
                  color="primary"/>}
                  label="Inferior"
                />
              </li>
            </ul>
          </div>
        </div>
      </Paper>
    );
  }
}
