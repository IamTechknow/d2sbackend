import { mount } from 'enzyme';
import React from 'react';

import Skills from '../../main/webapp/js/skills';
import * as ClassData from '../../main/webapp/js/class-data';

const MAX_SKILL_LVL = 20;

// Control variables
const classNum = 0;
const allocated = new Array(30).fill(0);
let skillPoints = 0;

// Functions for dependency injection
const onFormChange = function onFormChange(event) {
  const { name, value } = event.target;

  // Parse skill number and update array
  allocated[Number.parseInt(name.substring(6), 10)] = Math.min(MAX_SKILL_LVL, Number.parseInt(value, 10));
  skillPoints -= 1;
};

describe('Skills component test suite', () => {
  it('Should show unmet dependencies', () => {
    skillPoints = 10;
    const comp = mount(
      <Skills
        classNum={classNum}
        allocated={allocated}
        skillPoints={skillPoints}
        handler={onFormChange}
      />,
    );

    // Set skills for the last three skills
    let inputs = comp.find('input');
    let input1 = inputs.at(27);
    let input2 = inputs.at(28);
    let input3 = inputs.at(29);

    // Create the event object that will be passed into onFormChange
    input1.simulate('change', { target: { name: 'skill-27', value: input1.prop('value') + 1 } });
    input2.simulate('change', { target: { name: 'skill-28', value: input2.prop('value') + 1 } });
    input3.simulate('change', { target: { name: 'skill-29', value: input3.prop('value') + 1 } });

    // Verify they have the is-invalid class
    comp.setProps({ allocated, skillPoints });
    comp.update();

    expect(comp.find('.is-invalid').length).toBe(3);
  });
});
