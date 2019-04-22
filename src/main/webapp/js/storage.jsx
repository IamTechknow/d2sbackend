import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StorageGrid from './storageGrid';
import Equipment from './equipment';

const EQUIP = 0, INV = 1, TYPES = 5;

// Manages character storage, including the current storage type and configuring the storage grid.
export default class Storage extends Component {
  static getStorageType(type) {
    return ['Equipment', 'Inventory', 'Stash', 'Belt', 'Horadric Cube'][type];
  }

  constructor(props) {
    super(props);

    this.state = {
      currType: INV,
    };

    this.onStorageChange = this.onStorageChange.bind(this);
  }

  onStorageChange(event) {
    this.setState({ currType: Number.parseInt(event.target.value, 10) });
  }

  getItemsFrom(type) {
    const { items } = this.props;
    return items[type];
  }

  getMapFrom(type) {
    const { itemMaps } = this.props;
    return itemMaps[type];
  }

  render() {
    const { currType } = this.state;
    const { clickHandler, delHandler } = this.props;

    return (
      <div className="entry">
        <select value={currType} onChange={this.onStorageChange} className="form-control storageHeader">
          {
            [...Array(TYPES)].map((obj, i) => (
              <option key={i} value={i}>{Storage.getStorageType(i)}</option>
            ))
          }
        </select>

        {
          currType === EQUIP
          ? (
            <Equipment
              items={this.getItemsFrom(currType)}
              itemMap={this.getMapFrom(currType)}
              clickHandler={clickHandler}
              delHandler={delHandler}
            />
          ) : (
            <StorageGrid
              type={currType}
              items={this.getItemsFrom(currType)}
              itemMap={this.getMapFrom(currType)}
              clickHandler={clickHandler}
              delHandler={delHandler}
            />
          )
        }
      </div>
    );
  }
}

// items is a 2D array, thus an array of object arrays
Storage.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  delHandler: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  itemMaps: PropTypes.arrayOf(PropTypes.instanceOf(Map)).isRequired,
};
