import React, { Component } from 'react';

import Bonuses from './bonuses';
import Storage from './storage';
import Dashboard from './dashboard';

export default class Items extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="d2Grid entryGrid">
          <Bonuses />
          <Storage />
        </div>

        <Dashboard />
      </div>
    );
  }
}
