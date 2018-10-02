import React, {Component} from 'react';

import Skill from './skill.jsx';
import * as ClassData from './class-data.jsx';

// Defines a list of skill options to allocate skill points for the character
export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.classNum = Number.parseInt(props.data.classNum);
  }

  // Activate Bootstrap tooltips via jQuery
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  getClass(classNum) {
    return ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][classNum];
  }

  getSkillDeps(depsArray) {
    if(depsArray.length === 0) {
        return "";
    }

    var skills = [];
    for(var dep of depsArray) {
        let offset = dep - ClassData[this.classNum].skills[0].id;
        skills.push(ClassData[this.classNum].skills[offset].name);
    }
    return "Depends on " + skills.join(", ");
  }

  render() {
    var allocated = this.props.data.allocated;
    return (
        <div>
            <p>Class: {this.getClass(this.classNum)}</p>
            <p>Skill points available: {this.props.data.skillPoints - this.props.data.allocated.reduce((accum, curr) => accum + curr )}</p>

            <div className="form-row">
                <div className="col-md-4">
                    { ClassData[this.classNum].skills.slice(0, 10).map((skill, i) =>
                        <Skill key={skill.id} formName={`skill-${i}`} skillName={skill.name}  skillId={skill.id} skillLevel={skill.level} skillDeps={this.getSkillDeps(skill.deps)} value={allocated[i]} handler={this.props.handler} />
                    )}
                </div>
                <div className="col-md-4">
                    { ClassData[this.classNum].skills.slice(10, 20).map((skill, i) =>
                        <Skill key={skill.id} formName={`skill-${10 + i}`} skillName={skill.name}  skillId={skill.id} skillLevel={skill.level} skillDeps={this.getSkillDeps(skill.deps)} value={allocated[10 + i]} handler={this.props.handler} />
                    )}
                </div>
                <div className="col-md-4">
                    { ClassData[this.classNum].skills.slice(20, 30).map((skill, i) =>
                        <Skill key={skill.id} formName={`skill-${20 + i}`} skillName={skill.name}  skillId={skill.id} skillLevel={skill.level} skillDeps={this.getSkillDeps(skill.deps)} value={allocated[20 + i]} handler={this.props.handler} />
                    )}
                </div>
            </div>
        </div>
    );
  }
}
