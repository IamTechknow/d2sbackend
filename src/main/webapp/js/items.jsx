import React, { Component } from 'react';
import Bonuses from './bonuses';
import Storage from './storage';

export default class Items extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="d2Grid entryGrid">
        <Bonuses />
        <Storage />
      </div>
    );
  }
}
