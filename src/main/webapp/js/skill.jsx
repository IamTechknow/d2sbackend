import React, {Component} from 'react';

// A skill component contains the skill name, id, and any skill dependencies
// as well as a customized form name. Its skill point value is passed to the Form component
export default class Skill extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label data-toggle="tooltip" data-placement="top" title={this.props.skillDeps}>{this.props.skillName + ` (Level ${this.props.skillLevel}+)`}
        <input type="number" className="skill form-control" name={this.props.formName} min="0" max="20" value={this.props.value} onChange={this.props.handler} />
      </label>
    );
  }
}
