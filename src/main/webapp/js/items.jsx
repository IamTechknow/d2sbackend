import React, { Component } from 'react';
import Bonuses from './bonuses';
import Inventory from './inventory';

export default class Items extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="d2Grid entryGrid">
        <Bonuses />
        <Inventory />
      </div>
    );
  }
}
