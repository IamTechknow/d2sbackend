import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bonuses from './bonuses';
import Storage from './storage';
import StorageGrid from './storageGrid';
import Dashboard from './dashboard';
import ItemUtils from './itemUtils';

export default class Items extends Component {
  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
  }

  // Determine all possible slots in the grid, and whether any are taken already
  static canItemFitHere(itemMap, type, r, c, height, width) {
    const gridWidth = StorageGrid.getData(type).width;
    const gridHeight = StorageGrid.getData(type).height;

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

  // Try to put an item in the specified storage
  // NOTE: When clicking on an item, the parent div will actually be clicked.
  // ATM that's not too problematic.
  onCellClick(type, r, c) {
    const {
      itemType, itemSubtype, itemId, rarity, itemMaps,
    } = this.props;
    if (!itemId) {
      return;
    }

    const { h, w } = ItemUtils.getSizeFor(itemSubtype, itemId);
    if (Items.canItemFitHere(itemMaps[type], type, r, c, h, w)) {
      this.props.onNewItem({
        itemType, itemSubtype, itemId, rarity, r, c, h, w,
      }, type);
    } else {
      // TODO: Use Snackbar or alert to indicate item may not be placed
      console.log('Item can\'t fit here at', r, c);
    }
  }

  render() {
    const {
      items, itemMaps, onItemSelected, onDeleteItem, itemId, itemType, itemSubtype, rarity, quality,
    } = this.props;

    return (
      <div>
        <div className="d2Grid entryGrid">
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
      </div>
    );
  }
}

Items.propTypes = {
  onNewItem: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  itemSubtype: PropTypes.string.isRequired,
  rarity: PropTypes.string.isRequired,
  quality: PropTypes.string.isRequired,
};
