import React, {Component} from 'react';

// A skill component contains the skill name, id, and any skill dependencies
// as well as a customized form name. Its skill point value is passed to the Form component
export default class Skill extends Component {
  constructor(props) {
    super(props);
    this.skillId = props.skillId;
    this.skillDependencies = props.skillDeps;
  }

  render() {
    return (
      <label>{this.props.skillName + ` (Level ${this.props.skillLevel}+)`}
        <input type="number" className="form-control" name={this.props.formName} min="0" max="20" defaultValue="0" onChange={this.props.handler} />
      </label>
    );
  }
}
