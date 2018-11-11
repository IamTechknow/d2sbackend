import { mount } from 'enzyme';
import React from 'react';

import MainData from '../../main/webapp/js/main';
import * as ClassData from '../../main/webapp/js/class-data';

const ADD_ALL = '1', ATTR_CLASS = '.attr';

// Control variables
let classNum = 0;
let level = 1;
let attr = [0, 0, 0, 0];
let charName = '';

// Functions for dependency injection
const onFormChange = function onFormChange(event) {
  const { name, value } = event.target;

  switch (name) {
    case 'name':
      charName = value;
      break;
    case 'level':
      level = Number.parseInt(value, 10);
      break;
    case 'classNum':
      classNum = Number.parseInt(value, 10);
      break;
    default:
      break;
  }
};

const onStatClick = function onStatClick(event) {
  if (event.target.dataset.mode === ADD_ALL) {
    const attrLeft = this.calcStats() - attr.reduce((accum, curr) => accum + curr);
    if (attrLeft > 0) attr[event.target.dataset.idx] += attrLeft;
  } else {
    attr[event.target.dataset.idx] += 5;
  }
};

const calcStats = function calcStats() {
  return 5 * (level - 1);
};

describe('MainData component test suite', () => {
  it('Should show the correct base attributes for the current class', () => {
    const comp = mount(
      <MainData
        classNum={classNum}
        level={level}
        currAttr={attr}
        stats={calcStats()}
        handler={onFormChange}
        btnHandler={onStatClick}
      />,
    );

    // Check that Amazon base attributes are shown
    let inputs = comp.find(ATTR_CLASS);
    let expectedAttr = ClassData[classNum].attributes;
    for (let i = 0; i < attr.length; i += 1) {
      expect(inputs.at(i).props().value).toBe(expectedAttr[i]);
    }

    // Switch to Sorceress and check again
    classNum = 2;
    comp.setProps({ classNum });
    comp.update();

    inputs = comp.find(ATTR_CLASS);
    expectedAttr = ClassData[classNum].attributes;
    for (let i = 0; i < attr.length; i += 1) {
      expect(inputs.at(i).props().value).toBe(expectedAttr[i]);
    }
  });
});
