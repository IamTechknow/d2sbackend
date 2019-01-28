import React, { Component } from 'react';

const INV = 1, STASH = 2, BELT = 3, CUBE = 4, DEFAULT_ROWS = 4, DEFAULT_COLS = 10;

// Displays any items onto the grid. Grid size depends on the storage type
export default class StorageGrid extends Component {
  constructor(props) {
    super(props);

    let width = DEFAULT_COLS;
    let height = DEFAULT_ROWS;

    if (props.type === STASH) {
      width = 6;
      height = 8;
    } else if (props.type === BELT) {
      width = 4;
      height = 1;
    } else if (props.type === CUBE) {
      width = 4;
      height = 3;
    }

    this.state = {
      type: props.type,
      width,
      height
    };
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}
