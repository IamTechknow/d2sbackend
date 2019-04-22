/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemUtils from './itemUtils';
import ItemTooltip from './itemToolTip';

const EQUIPMENT_TYPE = 0;

export default class Equipment extends Component {
  constructor(props) {
    super(props);
  }

  // Higher-order functions to associate each slot with specific types
  // For equipment, R and C correspond to the correct array location
  // It assumes The click handler in the Items component knows what types are allowed in the array slot
  onClickAt(slot) {
    const { clickHandler, type } = this.props;

    return () => {
      clickHandler(EQUIPMENT_TYPE, 0, slot);
    };
  }

  onRightClickAt(slot) {
    const { delHandler, type } = this.props;

    return (event) => {
      event.preventDefault();
      delHandler(EQUIPMENT_TYPE, 0, slot);
    };
  }

  getImageForItem(slot) {
    const { items, itemMap} = this.props;
    const item = items[slot];
    const imagePrefix = ItemUtils.getImgPrefix(item.rarity);

    return (
      <ItemTooltip
        item={item}
        imagePrefix={imagePrefix}
      />
    );
  }

  render() {
    const { clickHandler, delHandler, items, itemMap } = this.props;
    const slotClasses = ['head', 'amulet', 'left', 'body', 'right', 'hands', 'leftFinger', 'belt', 'rightFinger', 'feet', 'left2', 'right2'];

    return (
      <div className="equipment">
        {
          slotClasses.map((slotClass, slotNum) => (
            <div className={`equip ${slotClass}`}
              key={slotClass}
              role="button"
              tabIndex="-1"
              onClick={this.onClickAt(slotNum)}
              onKeyPress={this.onClickAt(slotNum)}
              onContextMenu={this.onRightClickAt(slotNum)}
            >
              {
                items[slotNum] && this.getImageForItem(slotNum)
              }
            </div>
          ))
        }
      </div>
    );
  }
}

Equipment.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  delHandler: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemMap: PropTypes.instanceOf(Map).isRequired,
};
