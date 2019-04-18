import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Item from './item';
import ItemData from './item-data';
import ItemUtils from './itemUtils';

const IMG_PREFIX = '';

export default class Dashboard extends Component {
  static getDataArray(type, subType, quality, rarity, group) {
    // Use one array or concat all. Fail gracefully if data doesn't exist
    if (!Dashboard.isRarityDisabled(type) && quality === 'All') {
      return ItemUtils.concatDataFor(ItemData, subType, rarity);
    }

    return ItemData[group] ? ItemData[group] : [];
  }

  // Should quality and rarity select elements be disabled?
  static isRarityDisabled(currType) {
    return currType === 'Miscellaneous' || currType === 'Jewelry';
  }

  static renderOptionsFor(type) {
    return ItemData[type].map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ));
  }

  constructor(props) {
    super(props);

    this.handleChangeFor = this.handleChangeFor.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.rarityRef = React.createRef();

    this.state = {
      randomAttr: false,
      ethernal: false,
      inferior: false,
    };
  }

  onSelectChange(event) {
    const { id, value } = event.target;
    const { prevType, prevSub } = this.state;
    const {
      currType, currSubType, currQuality, itemHandler,
    } = this.props;

    const newTypes = {
      [id]: value,
    };

    let prevState;

    // Account for new primary type
    if (id === 'currType') {
      prevState = {
        prevSub: currSubType,
        prevType: currType,
      };

      newTypes.currSubType = value !== prevType ? ItemData[value][0] : prevSub;
    }

    // Change current item. If rarity should be on, use rarity from select element
    const newRarity = this.rarityRef.current.value;
    const newQuality = id === 'currQuality' ? value : currQuality;
    const newType = id === 'currType' ? newTypes.currType : currType;
    const newSubType = id === 'currType' || id === 'currSubType'
      ? newTypes.currSubType : currSubType;

    if (!newTypes.currItemId) {
      if (!Dashboard.isRarityDisabled(newType)) {
        const group = ItemUtils.getGroup(newType, newSubType, newQuality, newRarity);
        const data = Dashboard.getDataArray(newType, newSubType, newQuality, newRarity, group);
        newTypes.currRarity = newRarity;
        newTypes.currItemId = data.length ? data[0].id : undefined;
      } else {
        const group = ItemUtils.getGroup(newType, newSubType, newQuality, newTypes.currRarity);
        newTypes.currItemId = ItemData[group][0].id;
        newTypes.currRarity = 'Unique';
      }
    }

    // Create a new item to change the form state, keep prev state locally
    itemHandler(new Item(newTypes.currItemId, newType, newSubType, newRarity, newQuality));
    if (prevState) {
      this.setState(prevState);
    }
  }

  // Higher-order function to forego binding
  handleChangeFor(name) {
    return (event) => {
      this.setState({ [name]: event.target.checked });
    };
  }

  renderItemOptions() {
    const {
      currType, currSubType, currQuality, currRarity,
    } = this.props;
    const group = ItemUtils.getGroup(currType, currSubType, currQuality, currRarity);
    const array = Dashboard.getDataArray(currType, currSubType, currQuality, currRarity, group);

    return array.map(obj => (
      <option key={obj.id} value={obj.id}>{obj.name}</option>
    ));
  }

  // Since item quality is internal to Items, its onChange handler differs
  render() {
    const {
      currType, currSubType, currRarity, currItemId, itemStr
    } = this.props;
    const {
      randomAttr, ethernal, inferior,
    } = this.state;

    const imagePrefix = ItemUtils.getImgPrefix(currType, currRarity);
    const imgClasses = ItemUtils.getImgClasses(currSubType, currItemId);

    return (
      <Paper style={{ marginBottom: '16px', padding: '16px' }}>
        <div className="d2Grid dashboardGrid">
          <div className="entry">
            <h3 className="storageHeader">Current item</h3>
            <div className="pickedUpItem">
              <img className={imgClasses} alt="" src={`${IMG_PREFIX}${imagePrefix}${currItemId}.png`} />
            </div>
            <p className="stats">
              {itemStr}
            </p>
          </div>

          <div id="dashboard">
            <h3 className="storageHeader">Item creation</h3>
            <ul className="list-group">
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Type</span>
                <select
                  id="currType"
                  className="form-control"
                  onChange={this.onSelectChange}
                  value={currType}
                >
                  {
                    Dashboard.renderOptionsFor('primary')
                  }
                </select>
                <select
                  id="currSubType"
                  className="form-control"
                  onChange={this.onSelectChange}
                  value={currSubType}
                >
                  {
                    Dashboard.renderOptionsFor(currType)
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Quality</span>
                <select
                  id="currQuality"
                  className="form-control dashboardOpt"
                  onChange={this.onSelectChange}
                  disabled={Dashboard.isRarityDisabled(currType)}
                >
                  {
                    Dashboard.renderOptionsFor('quality')
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
                  value={currRarity}
                  disabled={Dashboard.isRarityDisabled(currType)}
                >
                  {
                    Dashboard.renderOptionsFor('rarity')
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Item</span>
                <select
                  id="currItemId"
                  className="form-control dashboardOpt"
                  onChange={this.onSelectChange}
                  value={currItemId}
                >
                  {
                    this.renderItemOptions()
                  }
                </select>
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Runeword</span>
                <select
                  id="currRW"
                  className="form-control dashboardOpt"
                  onChange={this.onSelectChange}
                  disabled={Dashboard.isRarityDisabled(currType)}
                />
              </li>
              <li className="list-group-item d2Grid dashboardRow">
                <span className="dashboardItem">Options</span>
                <span className="dashboardItem" />
                <FormControlLabel
                  control={(
                    <Switch
                      checked={randomAttr}
                      onChange={this.handleChangeFor('randomAttr')}
                      color="primary"
                    />
)}
                  label="Random attribute values"
                />
                <FormControlLabel
                  control={(
                    <Switch
                      checked={ethernal}
                      onChange={this.handleChangeFor('ethernal')}
                      color="primary"
                    />
)}
                  label="Ethernal"
                />
                <FormControlLabel
                  control={(
                    <Switch
                      checked={inferior}
                      onChange={this.handleChangeFor('inferior')}
                      color="primary"
                    />
)}
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

Dashboard.propTypes = {
  currType: PropTypes.string.isRequired,
  currSubType: PropTypes.string.isRequired,
  currRarity: PropTypes.string.isRequired,
  currQuality: PropTypes.string.isRequired,
  currItemId: PropTypes.string.isRequired,
  itemStr: PropTypes.string.isRequired,
  itemHandler: PropTypes.func.isRequired,
};
