/* eslint-disable */
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default class Bonuses extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid item md={6}>
        <h3>Gear bonuses</h3>
        <Divider />
        <ul className="bonus-list">
          <li>Gear bonuses go here</li>
        </ul>
      </Grid>
    );
  }
}
