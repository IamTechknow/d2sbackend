import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Display warning messages based on the Form component state
export default class Warnings extends Component {
  static getSkillsMessage(errno) {
    const INVALID_NO_SP = 1, INVALID_LEVEL_LOW = 2;
    switch (errno) {
      case INVALID_NO_SP:
        return 'Character does not have enough skill points for this build!';
      case INVALID_LEVEL_LOW:
        return 'Character level is too low for at least one skill.';
      default:
        return 'Skill dependencies are not met for at least one skill.';
    }
  }

  static getStatsMessage(errno) {
    const STR_BELOW_BASE = 2, DEX_BELOW_BASE = 3, VIT_BELOW_BASE = 4, NRG_BELOW_BASE = 5;
    switch (errno) {
      case STR_BELOW_BASE:
        return "Strength points are below character's base value.";
      case DEX_BELOW_BASE:
        return "Dexterity points are below character's base value.";
      case VIT_BELOW_BASE:
        return "Vitality points are below character's base value.";
      case NRG_BELOW_BASE:
        return "Energy points are below character's base value.";
      default:
        return 'Too many points allocated, please subtract excess stats!';
    }
  }

  render() {
    const {
      invalidName, invalidForClassic, invalidAct, invalidAncients, invalidSkills, invalidStats,
    } = this.props;
    return (
      <div>
        {invalidName
          && <p className="alert alert-danger">Character name is invalid. It must be 2 to 15 characters long, must begin with a letter, and have up to either one dash or underscore.</p>
        }
        {invalidForClassic
          && <p className="alert alert-danger">Invalid character class. The character may not be a Druid or Assassin in Diablo II classic.</p>
        }
        {invalidAct
          && <p className="alert alert-danger">Invalid starting act. Act 5 does not exist in Diablo II classic.</p>
        }
        {invalidAncients
          && <p className="alert alert-danger">Character level is too low to have completed Ancients for the specified difficulties.</p>
        }
        {invalidSkills > 0
          && <p className="alert alert-danger">{`Skill point allocation invalid. ${Warnings.getSkillsMessage(invalidSkills)}`}</p>
        }
        {invalidStats > 0
          && <p className="alert alert-danger">{`Stat point allocation invalid. ${Warnings.getStatsMessage(invalidStats)}`}</p>
        }
      </div>
    );
  }
}

Warnings.propTypes = {
  invalidName: PropTypes.bool,
  invalidForClassic: PropTypes.bool,
  invalidAct: PropTypes.bool,
  invalidAncients: PropTypes.bool,
  invalidSkills: PropTypes.number,
  invalidStats: PropTypes.number,
};

Warnings.defaultProps = {
  invalidName: false,
  invalidForClassic: false,
  invalidAct: false,
  invalidAncients: false,
  invalidSkills: 0,
  invalidStats: 0,
};
