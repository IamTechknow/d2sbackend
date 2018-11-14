import { mount } from 'enzyme';
import React from 'react';

import Form from '../../main/webapp/js/form';

describe('Form component test suite', () => {
  it('displays a warning if there are not enough points for the current skill allocation', () => {
    const form = mount(
      <Form />,
    );

    // Change tab to skills
    form.instance().onTabChange(undefined, 1);
    form.update();

    // Apply skill point, switch tab back, submit form
    const target = {
      name: 'skill-1',
      value: '1',
      classList: ['skill'],
    };
    form.find('#skill-1').simulate('change', { target });

    form.instance().onTabChange(undefined, 0);
    form.update();

    form.find('form').simulate('submit');
    form.update();
    expect(form.state('invalidSkills')).toBe(1);
  });

  it('should display a warning for invalid stat distribution', () => {
    const INVALID_NEG_ATTR = 1, DEX_BELOW_BASE = 3, VIT_BELOW_BASE = 4, NRG_BELOW_BASE = 5;
    const form = mount(
      <Form />,
    );

    const nameTarget = {
      name: 'name',
      value: 'Valid',
      classList: [undefined],
    };

    // Set level to 10
    let target = {
      name: 'level',
      value: '10',
      classList: [undefined],
    };
    form.find('#level').simulate('change', { target });
    form.find('#name').simulate('change', { target: nameTarget });
    form.update();

    // Take away points from dexterity. Submit, restore points, repeat for vitality, energy
    target = {
      name: 'dex',
      value: '10',
      classList: ['attr'],
    };
    form.find('#dex').simulate('change', { target });
    form.find('form').simulate('submit');
    form.update();
    expect(form.state('invalidStats')).toBe(DEX_BELOW_BASE);

    target.value = '25';
    form.find('#dex').simulate('change', { target });

    target.name = 'vit';
    target.value = '10';
    form.find('#vit').simulate('change', { target });
    form.find('form').simulate('submit');
    form.update();
    expect(form.state('invalidStats')).toBe(VIT_BELOW_BASE);

    target.value = '20';
    form.find('#dex').simulate('change', { target });

    target.name = 'nrg';
    target.value = '10';
    form.find('#nrg').simulate('change', { target });
    form.find('form').simulate('submit');
    form.update();
    expect(form.state('invalidStats')).toBe(NRG_BELOW_BASE);

    // Press the +All and +5 buttons
    form.find('button.btn').at(1).simulate('click');
    form.find('button.btn').at(0).simulate('click');
    expect(form.state('attr')[0]).toBe(55);

    form.find('form').simulate('submit');
    form.update();
    expect(form.state('invalidStats')).toBe(INVALID_NEG_ATTR);
  });

  it('can allocate some or all attribute points at once', () => {
    const form = mount(
      <Form />,
    );

    const target = {
      name: 'level',
      value: '11',
      classList: [undefined],
    };
    form.find('#level').simulate('change', { target });
    form.update();

    // Press the +5 and +All buttons
    form.find('button.btn').at(0).simulate('click');
    expect(form.state('attr')[0]).toBe(5);
    form.find('button.btn').at(1).simulate('click');
    expect(form.state('attr')[0]).toBe(50);
  });

  it('should display a warning for invalid names', () => {
    const form = mount(<Form />);

    // Mock the event object which will be given to the form handler
    const target = {
      name: 'name',
      value: '_NotValid',
      classList: [undefined],
    };

    // Event propagation is currently not supported by Enzyme,
    // so simulate the submit event with the form, not the button.
    form.find('#name').simulate('change', { target });
    form.find('#submitButton').simulate('click'); // Doesn't trigger submit, do it for completeness
    form.find('form').simulate('submit');

    form.update();
    expect(form.find('.alert').length).toBe(1);
  });

  it('should prohibit selection of Act 5 or Expansion classes and Classic mode', () => {
    const form = mount(<Form />);

    const nameTarget = {
      name: 'name',
      value: 'Valid',
      classList: [undefined],
    };

    const actTarget = {
      name: 'startingAct',
      value: '4',
      classList: [undefined],
    };

    const optsTarget = {
      name: 'expansion',
      checked: false,
      classList: ['opts'],
    };

    const classTarget = {
      name: 'classNum',
      value: '5',
      classList: [undefined],
    };

    // Submit Druid class, classic mode, valid name, and Act 5
    form.find('#name').simulate('change', { target: nameTarget });
    form.find('#act5').simulate('change', { target: actTarget });
    form.find('#exp').simulate('change', { target: optsTarget });
    form.find('#classNum').simulate('change', { target: classTarget });
    form.find('#submitButton').simulate('click');
    form.find('form').simulate('submit');

    form.update();
    expect(form.find('.alert').length).toBe(2);
  });

  xit('can calculate the correct stats based on quest rewards', () => {
    const form = mount(
      <Form />,
    );
  });

  xit('should not allow Ancients rewards to be completed prematurely', () => {
    const form = mount(
      <Form />,
    );
  });
});
