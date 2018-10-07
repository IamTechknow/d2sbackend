import React, {Component} from 'react';

// Display warning messages based on the Form component state
export default class Warnings extends Component {
  getSkillsMessage(errno) {
    let INVALID_NO_SP = 1, INVALID_LEVEL_LOW = 2;
    switch(errno) {
        case INVALID_NO_SP:
            return "Character does not have enough skill points for this build!";
        case INVALID_LEVEL_LOW:
            return "Character level is too low for at least one skill.";
        default:
            return "Skill dependencies are not met for at least one skill.";
    }
  }

  getStatsMessage(errno) {
    let STR_BELOW_BASE = 2, DEX_BELOW_BASE = 3, VIT_BELOW_BASE = 4, NRG_BELOW_BASE = 5;
    switch(errno) {
        case STR_BELOW_BASE:
            return "Strength points are below character's base value.";
        case DEX_BELOW_BASE:
            return "Dexterity points are below character's base value.";
        case VIT_BELOW_BASE:
            return "Vitality points are below character's base value.";
        case NRG_BELOW_BASE:
            return "Energy points are below character's base value.";
        default:
            return "Too many points allocated, please subtract excess stats!";
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
            {this.props.data.invalidStats > 0 &&
                <p className="alert alert-danger">{"Stat point allocation invalid. " + this.getStatsMessage(this.props.data.invalidStats)}</p>
            }
        </div>
    );
  }
}

