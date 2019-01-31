import React, { Component } from 'react';
import StorageGrid from './storageGrid';
import Equipment from './equipment';

const EQUIP = 0, INV = 1, STASH = 2, BELT = 3, CUBE = 4, TYPES = 5;

// Manages character storage, including the current storage type and configuring the storage grid.
// Keeps objects for all storage types.
export default class Storage extends Component {
  constructor(props) {
    super(props);

    this.equipment = [];
    this.inventory = [];
    this.stash = [];
    this.belt = [];
    this.cube = [];

    this.state = {
      currType: INV,
    };

    this.onStorageChange = this.onStorageChange.bind(this);
  }

  static getStorageType(type) {
    return ['Equipment', 'Inventory', 'Stash', 'Belt', 'Horadric Cube'][type];
  }

  getItemsFrom(type) {
    switch (type) {
      case INV:
        return this.stash;
      case STASH:
        return this.belt;
      case BELT:
        return this.cube;
      default:
        return this.inventory;
    }
  }

  onStorageChange(event) {
    this.setState({ currType: Number.parseInt(event.target.value, 10) });
  }

  render() {
    const { currType } = this.state;

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
          && (
            <Equipment items={this.equipment} />
          )
        }

        <StorageGrid type={currType} items={this.getItemsFrom(currType)} />
      </div>
    );
  }
}
