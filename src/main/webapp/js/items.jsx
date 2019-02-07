import React, { Component } from 'react';

import Bonuses from './bonuses';
import Storage from './storage';
import StorageGrid from './storageGrid';
import Dashboard from './dashboard';
import ItemUtils from './itemUtils';

const TYPES = 5, TOP = 1, OCCUIPED = 2;

export default class Items extends Component {
  constructor(props) {
    super(props);

    // Arrays that contain all items in a storage grid
    this.storage = new Array(TYPES);

    // Sets that indicate occupied cells of a storage grid
    this.storageMap = new Array(TYPES);

    for (let i = 0; i < this.storage.length; i++) {
      this.storage[i] = [];
      this.storageMap[i] = new Map();
    }

    this.onCellClick = this.onCellClick.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.state = { itemId: undefined };
  }

  // Determine all possible slots in the grid, and whether any are taken already
  canItemFitHere(type, r, c, height, width) {
    const gridWidth = StorageGrid.getData(type).width;
    const gridHeight = StorageGrid.getData(type).height;

    for (let r1 = r; r1 < r + height; r1++) {
      for (let c1 = c; c1 < c + width; c1++) {
        // Is out of bounds or slot taken?
        if (r1 >= gridHeight || c1 >= gridWidth) {
          return false;
        }

        if (this.storageMap[type].has(r1 * gridWidth + c1)) {
          return false;
        }
      }
    }

    return true;
  }

  // Try to put an item in the specified storage
  onCellClick(type, r, c) {
    const { itemType, itemId, rarity } = this.state;
    if (!itemId) {
      return;
    }

    const { h, w } = ItemUtils.getSizeFor(itemType, itemId);
    if (this.canItemFitHere(type, r, c, h, w)) {
      this.storage[type].push({ itemType, itemId, rarity, r, c, h, w });
      this.updateStorageMap(type, this.storage[type].length - 1, r, c, h, w);
      console.log(this.storageMap[type]);
      this.forceUpdate();
    } else {
      console.log('Item can\'t fit here at', r, c);
    }
  }

  onItemSelected(itemType, itemId, rarity) {
    this.setState({ itemType, itemId, rarity });
  }

  // Fill the map for the given item, indicating the top left corner
  // That location contains the array index for the item
  updateStorageMap(type, itemIdx, r, c, height, width) {
    const gridWidth = StorageGrid.getData(type).width;
    for (let r1 = r; r1 < r + height; r1++) {
      for (let c1 = c; c1 < c + width; c1++) {
        const mapObj = {};
        if (r1 === r && c1 === c) {
          mapObj.status = TOP;
          mapObj.idx = itemIdx;
        } else {
          mapObj.status = OCCUIPED;
        }

        this.storageMap[type].set(r1 * gridWidth + c1, mapObj);
      }
    }
  }

  render() {
    const { itemId } = this.state;

    return (
      <div>
        <div className="d2Grid entryGrid">
          <Bonuses />
          <Storage
            currItemId={itemId}
            items={this.storage}
            itemMaps={this.storageMap}
            clickHandler={this.onCellClick} />
        </div>

        <Dashboard itemHandler={this.onItemSelected} />
      </div>
    );
  }
}
