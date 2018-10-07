import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default class Inventory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      {/* TODO: Center the title and grid with CSS. Add tile background and an on click handler */}
      <Grid item md={6}>
        <h3>Inventory</h3>
        <div className="inv-grid">
          Grid goes here
        </div>
      </Grid>
    );
  }
}
