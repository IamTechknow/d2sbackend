import React, {Component} from 'react';

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
        case 0:
          return "Amazon";
        case 1:
          return "Sorceress";
        case 2:
          return "Necromancer";
        case 3:
          return "Paladin";
        case 4:
          return "Barbarian";
        case 5:
          return "Druid";
        default:
          return "Assassin";
    }
  }

  render() {
    return (
        <div>
            <p>Class: {this.getClass(this.state.classNum)}</p>
            <p>Skill points: {this.state.skillPoints}</p>
        </div>
    );
  }
}
