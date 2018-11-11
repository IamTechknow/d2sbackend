import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Bonuses from './bonuses.jsx';
import Inventory from './inventory.jsx';

export default class Items extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <Bonuses />
        <Inventory />
      </Grid>
    );
  }
}
