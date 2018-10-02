import React, {Component} from 'react';

// A skill component contains the skill name, id, and any skill dependencies
// as well as a customized form name. Its skill point value is passed to the Form component
var Skill = (props) => (
  <label data-toggle="tooltip" data-placement="top" title={props.skillDeps}>{props.skillName + ` (Level ${props.skillLevel}+)`}
    <input type="number" className="skill form-control" name={props.formName} min="0" max="20" value={props.value} onChange={props.handler} />
  </label>
);

export default Skill;
