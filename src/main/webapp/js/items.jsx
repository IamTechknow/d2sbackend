import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bonuses from './bonuses';
import Storage from './storage';
import StorageGrid from './storageGrid';
import Dashboard from './dashboard';
import ItemUtils from './itemUtils';
import Item from './item';

const BELT = 3, EQUIPMENT = 0;

export default class Items extends Component {
  // Determine all possible slots in the grid, and whether any are taken already
  static canItemFitHere(itemMap, storageType, subType, r, c, height, width) {
    const gridWidth = StorageGrid.getData(storageType).width;
    const gridHeight = StorageGrid.getData(storageType).height;

    // Only potions and scrolls for belts
    if (storageType === BELT) {
      return subType === 'Potions' || subType === 'Scrolls';
    }

    if (storageType === EQUIPMENT) {
      return ItemUtils.canFitInEquipSlot(c, subType) && !itemMap.has(c);
    }

    for (let r1 = r; r1 < r + height; r1 += 1) {
      for (let c1 = c; c1 < c + width; c1 += 1) {
        // Is out of bounds or slot taken?
        if (r1 >= gridHeight || c1 >= gridWidth) {
          return false;
        }

        if (itemMap.has(r1 * gridWidth + c1)) {
          return false;
        }
      }
    }

    return true;
  }

  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
  }

  // Try to put an item in the specified storage. c = slot number for equipment storage
  // NOTE: When clicking on an item, the cell div that contains the item will be clicked.
  // ATM that's not too problematic.
  onCellClick(storageType, r, c) {
    const {
      items, itemType, itemSubtype, itemId, rarity, quality, itemMaps, onItemSelected, onNewItem,
    } = this.props;

    if (!itemId) {
      return;
    }

    // If an item doesn't fit in the clicked area, check if an item already exists there
    const { h, w } = ItemUtils.getSizeFor(itemSubtype, itemId);
    if (Items.canItemFitHere(itemMaps[storageType], storageType, itemSubtype, r, c, h, w)) {
      onNewItem(new Item(itemId, itemType, itemSubtype, rarity, quality, r, c, h, w), storageType, c);
    } else if (storageType !== EQUIPMENT || items[storageType][c]) {
      const { width } = StorageGrid.getData(storageType);
      const itemArray = items[storageType];
      const item = itemArray[itemMaps[storageType].get(r * width + c).idx];

      if (quality === 'All') {
        onItemSelected(item);
      }
    }
  }

  render() {
    const {
      items, itemMaps, onItemSelected, onDeleteItem, itemId, itemType, itemSubtype, itemStr,
      rarity, quality,
    } = this.props;

    return (
      <>
        <div className="d2Grid itemSeparator">
          <Bonuses />
          <Storage
            currItemId={itemId}
            items={items}
            itemMaps={itemMaps}
            clickHandler={this.onCellClick}
            delHandler={onDeleteItem}
          />
        </div>

        <Dashboard
          currType={itemType}
          currSubType={itemSubtype}
          currRarity={rarity}
          currQuality={quality}
          currItemId={itemId}
          itemStr={itemStr}
          itemHandler={onItemSelected}
        />
      </>
    );
  }
}

Items.propTypes = {
  onNewItem: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  itemSubtype: PropTypes.string.isRequired,
  itemStr: PropTypes.string.isRequired,
  rarity: PropTypes.string.isRequired,
  quality: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  itemMaps: PropTypes.arrayOf(PropTypes.instanceOf(Map)).isRequired,
};
