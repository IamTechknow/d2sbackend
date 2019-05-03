import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// For material-ui, use typography v2
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const IMG_PREFIX = '/img/';

const styles = {
  root: {
    'font-size': '16px',
    'margin-top': '1em',
    'text-align': 'center',
    'white-space': 'pre-line',
  },
};

const ItemTooltip = ({ item, imagePrefix, classes }) => (
  <Tooltip title={item.toString()} classes={{ tooltip: classes.root }} placement="top">
    <img alt="" src={`${IMG_PREFIX}${imagePrefix}${item.itemId}.gif`} />
  </Tooltip>
);

ItemTooltip.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    toString: PropTypes.func.isRequired,
  }).isRequired,
  imagePrefix: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

// Export a version of ItemTooltip with overriding classes.
export default withStyles(styles)(ItemTooltip);
