import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Skill from './skill';
import * as ClassData from './class-data';

// Defines a list of skill options to allocate skill points for the character
export default class Skills extends Component {
  static getClass(classNum) {
    return ['Amazon', 'Sorceress', 'Necromancer', 'Paladin', 'Barbarian', 'Druid', 'Assassin'][classNum];
  }

  getSkillDeps(depsArray) {
    if (depsArray.length === 0) {
      return '';
    }

    const skills = [];
    depsArray.forEach((dep) => {
      const { classNum } = this.props;
      const offset = dep - ClassData[classNum].skills[0].id;
      skills.push(ClassData[classNum].skills[offset].name);
    });
    return `Depends on ${skills.join(', ')}`;
  }

  isInvalid(idx) {
    const { allocated, classNum } = this.props;
    const { skills } = ClassData[classNum];
    const { deps } = skills[idx];
    const offset = [6, 36, 66, 96, 126, 221, 251][classNum];

    for (let i = 0; i < deps.length; i += 1) {
      if (allocated[idx] > 0 && allocated[deps[i] - offset] < 1) {
        return true;
      }
    }

    return false;
  }

  render() {
    const {
      allocated, skillPoints, classNum, handler,
    } = this.props;
    return (
      <div>
        <p>
          Class:&nbsp;
          {Skills.getClass(classNum)}
        </p>
        <p>
          Skill points available:&nbsp;
          {skillPoints - allocated.reduce((accum, curr) => accum + curr)}
        </p>

        <div className="form-row">
          <div className="col-md-4">
            { ClassData[classNum].skills.slice(0, 10).map((skill, i) => (
              <Skill
                key={skill.id}
                skill={skill}
                formName={`skill-${i}`}
                deps={this.getSkillDeps(skill.deps)}
                value={allocated[i]}
                handler={handler}
                invalid={this.isInvalid(i)}
              />
            ))}
          </div>
          <div className="col-md-4">
            { ClassData[classNum].skills.slice(10, 20).map((skill, i) => (
              <Skill
                key={skill.id}
                skill={skill}
                formName={`skill-${10 + i}`}
                deps={this.getSkillDeps(skill.deps)}
                value={allocated[10 + i]}
                handler={handler}
                invalid={this.isInvalid(10 + i)}
              />
            ))}
          </div>
          <div className="col-md-4">
            { ClassData[classNum].skills.slice(20, 30).map((skill, i) => (
              <Skill
                key={skill.id}
                skill={skill}
                formName={`skill-${20 + i}`}
                deps={this.getSkillDeps(skill.deps)}
                value={allocated[20 + i]}
                handler={handler}
                invalid={this.isInvalid(20 + i)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Skills.propTypes = {
  classNum: PropTypes.number.isRequired,
  allocated: PropTypes.arrayOf(PropTypes.number).isRequired,
  skillPoints: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};
