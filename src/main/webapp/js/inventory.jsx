import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

export default class Inventory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="entry">
        <h3>Inventory</h3>
        <div className="">
          Grid goes here
        </div>
      </div>
    );
  }
}
