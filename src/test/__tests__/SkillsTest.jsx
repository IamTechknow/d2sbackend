import { mount } from 'enzyme';
import React from 'react';

import Skills from '../../main/webapp/js/skills';
import * as ClassData from '../../main/webapp/js/class-data';

const MAX_SKILL_LVL = 20;

// Control variables
const classNum = 0;
const allocated = new Array(30).fill(0);
const skillPoints = 0;

// Functions for dependency injection
const onFormChange = function onFormChange(event) {
  const { name, value } = event.target;

  // Parse skill number and update array
  allocated[Number.parseInt(name.substring(6), 10)] = Math.min(MAX_SKILL_LVL, Number.parseInt(value, 10));
};

describe('Skills component test suite', () => {
  it('Should keep track of how many skill points are available', () => {
    const header = mount(
      <Skills
        classNum={classNum}
        allocated={allocated}
        skillPoints={skillPoints}
        handler={onFormChange}
      />,
    );
  });

  it('Should not allow more than 20 points to be allocated to a skill', () => {
    const header = mount(
      <Skills
        classNum={classNum}
        allocated={allocated}
        skillPoints={skillPoints}
        handler={onFormChange}
      />,
    );
  });
});
