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

  static getImgClasses(subType, currItemId) {
    let result = 'pickedUpImg ';

    switch(subType) {
      case 'Belts':
        return result + 'pickedUp1x2';
      case 'Gloves':
      case 'Boots':
      case 'Necromancer Totems':
      case 'Helms':
      case 'Druid Helms':
      case 'Barbarian Helms':
      case 'Circlets':
        return result + 'pickedUp2x2';
      case 'Body Armor':
        return result + 'pickedUp3x2';
      case 'Assassin Claws':
        return result + 'pickedUp3x1';
      case 'Tomes':
      case 'Wands':
        return result + 'pickedUp2x1';
      case 'No subtypes':
      case 'Runes':
      case 'Gems':
      case 'Potions':
      case 'Other':
        return result + 'pickedUp1x1';
      case 'Spears':
      case 'Polearms':
        return result;
      default: // account for items with various grid sizes
        return result + getImgClassesFor(currItemId);
    }
  }

  // Account for normal, unique, and set IDs that don't fit the above criteria
  static getImgClassesFor(id) {
    // Sorc orbs
    const Items2By1 = ['ob1', 'ob2', 'ob3', 'ob4', 'ob6', 'ob7', 'ob8', 'ob9',
      'obb', 'obc', 'obd', 'obe'];
    // Daggers, throwing knives
    Items2By1 = ['dgr', 'dir', 'kri', 'bld', 'tkf', 'tax', 'bkf', '9dg', '9di',
      '9tk', '9ta', '9bk', '7dg', '7di', '7tk', '7ta', '7bk', '9tk', '9ta', '9bk', '7dg'];

    // Shields and Paladin Shields
    const Items2By2 = ['buc', 'sml', 'xuc', 'xml', 'pal', 'pa2', 'pa5', 'uuc',
      'uml', 'pa6', 'pa7', 'paa', 'pab', 'pac', 'paf'];
    const Items3By2 = ['lrg', 'kit', 'tow', 'bsh', 'spk', 'xrg', 'xit', 'xow',
      'xsh', 'xpk', 'urg', 'uit', 'uow', 'ush', 'upk'];

    // Normal Swords, Axes, Scepters, Throwing weapons, staves
    const Items3By1 = ['hax', 'clb', 'scp', 'gsc', 'spc', 'mac', 'mst', 'ssd',
      'scm', 'flc', 'wsd', 'kri', 'bld', 'jav', 'pil', 'ssp', 'sst', 'leg', 'msf'];
    Items3By1.append(['9ha', '9cl', '9sc', '9qs', '9sp', '9ma', '9mt', '9ss',
      '9sm', '9sb', '9fc', '9wd', '9kr', '9bl', '9ja', '9pi', '9s9', '8ss']);
    Items3By1.append(['7ha', '7cl', '7sc', '7qs', '7sp', '7ma', '7mt', '7ss',
      '7sm', '7sb', '7fc', '7wd', '7kr', '7bl', '7ja', '7pi', '7s7', '6ss']);

    // Sorc orbs, Amazon javelins
    Items3By1.append(['ob5', 'am5', 'oba', 'ama', 'obf', 'amf']);

    const Items4By1 = [];

    if (new Set(Items2By1).has(id)) {
      return result + 'pickedUp2x1';
    }

    if (new Set(Items2By2).has(id)) {
      return result + 'pickedUp2x2';
    }

    if (new Set(Items3By2).has(id)) {
      return result + 'pickedUp3x2';
    }

    if (new Set(Items3By1).has(id)) {
      return result + 'pickedUp3x1';
    }

    if (new Set(Items4By1).has(id)) {
      return result + 'pickedUp4x1';
    }

    // All other IDs are for 4x2
    return result;
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
    const imgClasses = Dashboard.getImgClasses(currSubType, currItemId);

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
