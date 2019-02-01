import React, { Component } from 'react';

const INV = 1, STASH = 2, BELT = 3, CUBE = 4, DEFAULT_ROWS = 4, DEFAULT_COLS = 10;

// Displays any items onto the grid. Grid size depends on the storage type
export default class StorageGrid extends Component {
  constructor(props) {
    super(props);
  }

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

  // Render the grid, will use conditional rendering for items based on size and coordinates
  render() {
    const { width, height, rowClass } = StorageGrid.getData(this.props.type);
    const rowClasses = `storageRow ${rowClass}`;

    return (
      <div>
        { this.props.type > 0 &&
          [...Array(height)].map(r => (
            <div className={rowClasses}>
              {
                [...Array(width)].map(c => (
                  <div className="storageCell" />
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}
