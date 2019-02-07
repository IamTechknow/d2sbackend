import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INV = 1, TOP = 1, STASH = 2, BELT = 3, CUBE = 4, DEFAULT_ROWS = 4, DEFAULT_COLS = 10;
const IMG_PREFIX = '';

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

  // Higher-order function to forego binding, send clicked coordinates to items component
  onClickAt(r, c) {
    return () => {
      this.props.clickHandler(this.props.type, r, c);
    };
  }

  isItemTopAt(r, c) {
    const { width } = StorageGrid.getData(this.props.type);
    const temp = this.props.itemMap.get(r * width + c);
    return temp && temp.status === TOP;
  }

  getImageForItem(r, c) {
    const { items, itemMap, type } = this.props;
    const { width } = StorageGrid.getData(type);
    const item = items[itemMap.get(r * width + c).idx];
    const imagePrefix = item.rarity === 'Unique' ? 'u' : item.rarity === 'Set' ? 's' : '';

    return <img alt="" src={`${IMG_PREFIX}${imagePrefix}${item.itemId}.png`} />;
  }

  // Render the grid, will use conditional rendering for items based on size and coordinates
  render() {
    const { type } = this.props;
    const { width, height, rowClass } = StorageGrid.getData(type);
    const rowClasses = `storageRow ${rowClass}`;

    return (
      <div>
        { type > 0
          && [...Array(height)].map((undef, r) => (
            <div key={`row-${r}`} className={rowClasses}>
              {
                [...Array(width)].map((undef, c) => (
                  <div key={`col-${c}`} className="storageCell" onClick={this.onClickAt(r, c)}>
                    {
                      this.isItemTopAt(r, c) && this.getImageForItem(r, c)
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

StorageGrid.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
