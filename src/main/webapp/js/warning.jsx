import React, {Component} from 'react';

// Display warning messages based on the Form component state
export default class Warnings extends Component {
  constructor(props) {
    super(props);
  }

  getSkillsMessage(errno) {
    let INVALID_NO_SP = 1, INVALID_LEVEL_LOW = 2, INVALID_DEPS = 3;
    switch(errno) {
        case INVALID_NO_SP:
            return "Character does not have enough skill points for this build!";
        case INVALID_LEVEL_LOW:
            return "Character level is too low for at least one skill.";
        default:
            return "Skill dependencies are not met for at least one skill.";
    }
  }

  render() {
    return (
        <div>
            {this.props.data.invalidName &&
                <p className="alert alert-danger">Character name is invalid. It must be 2 to 15 characters long, must begin with a letter, and have up to either one dash or underscore.</p>
            }
            {this.props.data.invalidForClassic &&
                <p className="alert alert-danger">Invalid character class. The character may not be a Druid or Assassin in Diablo II classic.</p>
            }
            {this.props.data.invalidAct &&
                <p className="alert alert-danger">Invalid starting act. Act 5 does not exist in Diablo II classic.</p>
            }
            {this.props.data.invalidAncients &&
                <p className="alert alert-danger">Character level is too low to have completed Ancients for the specified difficulties.</p>
            }
            {this.props.data.invalidSkills > 0 &&
                <p className="alert alert-danger">{"Skill point allocation invalid. " + this.getSkillsMessage(this.props.data.invalidSkills)}</p>
            }
        </div>
    );
  }
}

