import { mount } from 'enzyme';
import React from 'react';

import Form from '../../main/webapp/js/form';

// Helper method to trigger the callback for a name or level change
const simName = function simName(form, name) {
  const nameTarget = {
    name: 'name',
    value: name,
    classList: [undefined],
  };
  form.find('#name').simulate('change', { target: nameTarget });
};

const simLevel = function simLevel(form, level) {
  const levelTarget = {
    name: 'level',
    value: level,
    classList: [undefined],
  };
  form.find('#level').simulate('change', { target: levelTarget });
};

describe('Form component test suite', () => {
  it('displays a warning if there are not enough points for the current skill allocation', () => {
    const form = mount(<Form />);

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

    // Go back to the Main tab
    form.instance().onTabChange(undefined, 0);
    form.update();

    // Event propagation is currently not supported by Enzyme,
    // so simulate the submit event with the form, not the button.

    form.find('#submitButton').simulate('click'); // Doesn't trigger submit, do it for completeness
    form.find('form').simulate('submit');
    form.update();
    expect(form.state('invalidSkills')).toBe(1);
  });

  it('should display warnings for invalid level or dependencies', () => {
    const form = mount(<Form />);

    // Change tab to skills
    form.instance().onTabChange(undefined, 1);
    form.update();

    // Apply skill point, switch tab back, submit form
    const target = {
      name: 'skill-29',
      value: '1',
      classList: ['skill'],
    };
    form.find('#skill-29').simulate('change', { target });

    form.instance().onTabChange(undefined, 0);
    form.update();

    // Change level to 2, expect level too low
    simName(form, 'Valid');
    simLevel(form, '2');

    form.find('form').simulate('submit');
    form.update();
    expect(form.state('invalidSkills')).toBe(2);

    // Change level to 31, expect dependencies not met
    simLevel(form, '31');

    form.find('form').simulate('submit');
    form.update();
    expect(form.state('invalidSkills')).toBe(3);
  });

  it('should display a warning for invalid stat distribution', () => {
    const INVALID_NEG_ATTR = 1, DEX_BELOW_BASE = 3, VIT_BELOW_BASE = 4, NRG_BELOW_BASE = 5;
    const form = mount(<Form />);

    simName(form, 'Valid');
    simLevel(form, '10');
    form.update();

    // Take away points from dexterity. Submit, restore points, repeat for vitality, energy
    const target = {
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
    const form = mount(<Form />);

    simLevel(form, '11');
    form.update();

    // Press the +5 and +All buttons
    form.find('button.btn').at(0).simulate('click');
    expect(form.state('attr')[0]).toBe(5);
    form.find('button.btn').at(1).simulate('click');
    expect(form.state('attr')[0]).toBe(50);
  });

  it('should display a warning for invalid names', () => {
    const form = mount(<Form />);

    simName(form, '_NotValid');
    form.find('form').simulate('submit');

    form.update();
    expect(form.find('.alert').length).toBe(1);
  });

  it('should prohibit selection of Act 5 or Expansion classes and Classic mode', () => {
    const form = mount(<Form />);

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
    simName(form, 'Valid');
    form.find('#act5').simulate('change', { target: actTarget });
    form.find('#exp').simulate('change', { target: optsTarget });
    form.find('#classNum').simulate('change', { target: classTarget });
    form.find('form').simulate('submit');

    form.update();
    expect(form.find('.alert').length).toBe(2);
  });

  it('can calculate the correct stats based on quest rewards', () => {
    const form = mount(<Form />);

    // Check Lam Esen's Tome box and set diff to nightmare
    const target = {
      name: 'lamEsen',
      checked: true,
      classList: ['rewards'],
    };

    const actTarget = {
      name: 'startingAct',
      value: '4',
      classList: [undefined],
    };

    const diffTarget = {
      name: 'difficulty',
      value: '5',
      classList: [undefined],
    };

    simName(form, 'Valid');
    form.find('#lamEsen').simulate('change', { target });
    form.find('#act5').simulate('change', { target: actTarget });
    form.find('#nm').simulate('change', { target: diffTarget });

    form.update();

    expect(form.instance().calcStats()).toBe(10);
  });

  it('should not allow Ancients rewards to be completed prematurely', () => {
    const form = mount(<Form />);

    const target = {
      name: 'nAncients',
      checked: true,
      classList: ['rewards'],
    };

    // Check Normal Ancients box
    simName(form, 'Valid');
    form.find('#nAncients').simulate('change', { target });
    form.find('form').simulate('submit');

    form.update();
    expect(form.find('.alert').length).toBe(1);

    // Check Nightmare and Hell Ancients, change level to 42
    simLevel(form, '42');
    target.name = 'nmAncients';
    form.find('#nmAncients').simulate('change', { target });
    target.name = 'hAncients';
    form.find('#hAncients').simulate('change', { target });
    form.find('form').simulate('submit');

    form.update();
    expect(form.find('.alert').length).toBe(1);
  });
});
