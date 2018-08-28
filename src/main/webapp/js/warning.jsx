import React, {Component} from 'react';

// Display warning messages based on the Form component state
export default class Warnings extends Component {
  constructor(props) {
    super(props);
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
        </div>
    );
  }
}

