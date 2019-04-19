import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemUtils from './itemUtils';

const IMG_PREFIX = '';
const TOP = 1, STASH = 2, BELT = 3, CUBE = 4, DEFAULT_ROWS = 4, DEFAULT_COLS = 10;

// Displays any items onto the grid. Grid size depends on the storage type
export default class StorageGrid extends Component {
  static getData(type) {
    let width = DEFAULT_COLS;
    let height = DEFAULT_ROWS;
    let rowClass = 'storageInv';

    if (type === STASH) {
      width = 6;
      height = 8;
      rowClass = 'storageStash';
    } else if (type === BELT) {
      width = 4;
      height = 1;
      rowClass = 'storageBelt';
    } else if (type === CUBE) {
      width = 3;
      height = 4;
      rowClass = 'storageCube';
    }

    return { width, height, rowClass };
  }

  // Higher-order functions to forego binding, send clicked coordinates to items component
  onClickAt(r, c) {
    const { clickHandler, type } = this.props;

    return () => {
      clickHandler(type, r, c);
    };
  }

  onRightClickAt(r, c) {
    const { delHandler, type } = this.props;

    return (event) => {
      event.preventDefault();
      delHandler(type, r, c);
    };
  }

  getImageForItem(r, c) {
    const { items, itemMap, type } = this.props;
    const { width } = StorageGrid.getData(type);
    const item = items[itemMap.get(r * width + c).idx];
    const imagePrefix = ItemUtils.getImgPrefix(item.rarity);

    return (
      <img alt="" src={`${IMG_PREFIX}${imagePrefix}${item.itemId}.png`} />
    );
  }

  isItemTopAt(r, c) {
    const { itemMap, type } = this.props;

    const { width } = StorageGrid.getData(type);
    const temp = itemMap.get(r * width + c);
    return temp && temp.status === TOP;
  }

  // Render the grid, will use conditional rendering for items based on size and coordinates
  render() {
    const { type } = this.props;
    const { width, height, rowClass } = StorageGrid.getData(type);
    const rowClasses = `storageRow ${rowClass}`;

    return (
      <>
        { type > 0
          && [...Array(height)].map((unusedR, r) => (
            <div key={`row-${r}`} className={rowClasses}>
              {
                [...Array(width)].map((unusedC, c) => (
                  <div
                    key={`col-${c}`}
                    role="button"
                    tabIndex="-1"
                    className="storageCell"
                    onClick={this.onClickAt(r, c)}
                    onKeyPress={this.onClickAt(r, c)}
                    onContextMenu={this.onRightClickAt(r, c)}
                  >
                    {
                      this.isItemTopAt(r, c) && this.getImageForItem(r, c)
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </>
    );
  }
}

StorageGrid.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  delHandler: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemMap: PropTypes.instanceOf(Map).isRequired,
};
