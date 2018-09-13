import React, {Component} from 'react';

import Skill from './skill.jsx';
import * as ClassData from './class-data.jsx';

const ZON = 0, SORC = 1, NECRO = 2, PAL = 3, BARB = 4, DRUID = 5;

// Defines a list of skill options to allocate skill points for the character
export default class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classNum: Number.parseInt(props.data.classNum),
      skillPoints: props.data.skillPoints,
    };
  }

  getClass(classNum) {
    switch(classNum) {
        case ZON:
          return "Amazon";
        case SORC:
          return "Sorceress";
        case NECRO:
          return "Necromancer";
        case PAL:
          return "Paladin";
        case BARB:
          return "Barbarian";
        case DRUID:
          return "Druid";
        default:
          return "Assassin";
    }
  }

  render() {
    var allocated = this.props.data.allocated;
    return (
        <div>
            <p>Class: {this.getClass(this.state.classNum)}</p>
            <p>Skill points available: {this.state.skillPoints - this.props.data.allocated.reduce( ( accum, curr) => accum + curr )}</p>

            <div className="form-row">
                <div className="col-md-4">
                    { ClassData[this.state.classNum].skills.slice(0, 10).map((skill, i) =>
                        <Skill key={skill.id} formName={`skill-${i}`} skillName={skill.name}  skillId={skill.id} skillLevel={skill.level} skillDeps={skill.deps} value={allocated[i]} handler={this.props.handler} />
                    )}
                </div>
                <div className="col-md-4">
                    { ClassData[this.state.classNum].skills.slice(10, 20).map((skill, i) =>
                        <Skill key={skill.id} formName={`skill-${10 + i}`} skillName={skill.name}  skillId={skill.id} skillLevel={skill.level} skillDeps={skill.deps} value={allocated[10 + i]} handler={this.props.handler} />
                    )}
                </div>
                <div className="col-md-4">
                    { ClassData[this.state.classNum].skills.slice(20, 30).map((skill, i) =>
                        <Skill key={skill.id} formName={`skill-${20 + i}`} skillName={skill.name}  skillId={skill.id} skillLevel={skill.level} skillDeps={skill.deps} value={allocated[20 + i]} handler={this.props.handler} />
                    )}
                </div>
            </div>
        </div>
    );
  }
}
