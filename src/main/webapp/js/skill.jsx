import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// For material-ui, use typography v2
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = {
  root: {
    'font-size': '16px',
  },
};

// A skill component contains the skill name, id, and any skill dependencies
// as well as a customized form name. Its skill point value is passed to the Form component
const Skill = ({
  skill, formName, deps, value, handler, invalid, classes,
}) => {
  const validClass = invalid ? 'skill form-control is-invalid' : 'skill form-control';
  return (
    <Tooltip title={deps} classes={{ tooltip: classes.root }} placement="top">
      <label className="skill_ui" htmlFor={formName}>
        {`${skill.name} (Level ${skill.level}+)`}
        <input type="number" className={validClass} name={formName} id={formName} min="0" max="20" value={value} onChange={handler} />
      </label>
    </Tooltip>
  );
};

Skill.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
  formName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  deps: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

// Export a version of Skill with overriding classes.
export default withStyles(styles)(Skill);
