import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bonuses from './bonuses';
import Storage from './storage';
import StorageGrid from './storageGrid';
import Dashboard from './dashboard';
import ItemUtils from './itemUtils';

const BELT = 3;

export default class Items extends Component {
  // Determine all possible slots in the grid, and whether any are taken already
  static canItemFitHere(itemMap, storageType, subType, r, c, height, width) {
    const gridWidth = StorageGrid.getData(storageType).width;
    const gridHeight = StorageGrid.getData(storageType).height;

    // Only potions and scrolls for belts
    if (storageType === BELT) {
      return subType === 'Potions' || subType === 'Scrolls';
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

  // Try to put an item in the specified storage
  // NOTE: When clicking on an item, the parent div will actually be clicked.
  // ATM that's not too problematic.
  onCellClick(type, r, c, item) {
    const {
      itemType, itemSubtype, itemId, rarity, quality, itemMaps, onItemSelected, onNewItem,
    } = this.props;

    if (!itemId) {
      return;
    }

    // If item was selected, call onItemSelected prop
    // Don't switch unless quality is All to prevent putting wrong pictures
    if (item) {
      if (quality === 'All') {
        onItemSelected({
          currRarity: item.rarity,
          currItemId: item.itemId,
          currType: item.itemType,
          currSubType: item.itemSubtype,
        });
      }
      return;
    }

    const { h, w } = ItemUtils.getSizeFor(itemSubtype, itemId);
    if (Items.canItemFitHere(itemMaps[type], type, itemSubtype, r, c, h, w)) {
      onNewItem({
        itemType, itemSubtype, itemId, rarity, r, c, h, w,
      }, type);
    }
    // TODO: Use Snackbar or alert to indicate item may not be placed
  }

  render() {
    const {
      items, itemMaps, onItemSelected, onDeleteItem, itemId, itemType, itemSubtype, rarity, quality,
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
  rarity: PropTypes.string.isRequired,
  quality: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  itemMaps: PropTypes.arrayOf(PropTypes.instanceOf(Map)).isRequired,
};
