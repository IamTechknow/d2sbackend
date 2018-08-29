import React, {Component} from 'react';

// Material UI Components
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Form Components
import Warnings from './warning.jsx';
import MainData from './main.jsx';
import Options from './options.jsx';
import Acts from './acts.jsx';
import Difficulties from './difficulties.jsx';
import Quests from './quests.jsx';

// Padding style for paper components
const paperPadding = {
  padding: '16px',
};

// Implementation of the Form HTML
export default class Form extends Component {
    state = {
        currTab: 0,
        invalid: false,
        invalidForClassic: false,
        invalidName: false,
        invalidAct: false,
        invalidAncients: false,
    };

    constructor(props) {
        super(props);

        this.pattern = new RegExp(/^[a-zA-Z][a-zA-Z_-]*$/);
        this.checkQuestBoxes = this.checkQuestBoxes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
    }

    componentDidMount() {
        // If the state is updated, React will call render() to update the DOM
    }

    checkQuestBoxes(event) {
        event.preventDefault();
        var checkboxes = document.querySelector('#questCheckBoxes');
        var quest = checkboxes.querySelectorAll('input[type="checkbox"]');
        for (let box of quest)
            box.checked = "checked";
    }

    // Post form data then change the state
    postData(data) {
        return fetch("/", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            referrer: "no-referrer",
            body: data
        }).then(response => response.json());
    }

    onTabChange(event, value) {
        this.setState({currTab: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        // Validate name, class, act, Ancients quest
        const data = new FormData(event.target);
        var name = data.get("name"), level = parseInt(data.get("level"));
        var expansion = data.get("expansion") === "on";
        var nAncients = data.get("rewards.nAncients") === "on", nmAncients = data.get("rewards.nmAncients") === "on", hAncients = data.get("rewards.hAncients") === "on";

        var invalidName = name.length < 2 || name.length > 15 || !this.pattern.test(name),
            invalidForClassic = parseInt(data.get("classNum")) >= 5 && !expansion,
            invalidAct = parseInt(data.get("startingAct")) > 3 && !expansion,
            invalidAncients = (nAncients && level < 20) || (nmAncients && level < 40) || (hAncients && level < 60);

        // Fix progression for Classic mode
        if(!expansion) {
            var difficulty = data.get("difficulty");
            data.set("difficulty", difficulty - (difficulty / 5));
        }

        this.setState({
            invalid: invalidName || invalidForClassic || invalidAct || invalidAncients,
            invalidName: invalidName,
            invalidForClassic: invalidForClassic,
            invalidAct: invalidAct,
            invalidAncients: invalidAncients
        });

        // when done, use fetch API here, and then change the state to re-render/re-direct the page
        if(!this.state.invalid) {
            this.postData(data)
            .then(response => {
                this.setState({
                    valid: response.valid,
                    link: response.link || ""
                });
            })
            .catch(error => console.error(error));
        }
    }

    //TODO: Add tabs, make it possible to add skills
    render() {
        if(this.state.valid) {
            return (
                <div className="container">
                    <h1>Save created!</h1>
                    <a href={this.state.link}>Download this save</a> <br />
                    <a href="/">Create another save</a>
                </div>
            );
        }

        return (
            <div className="container">
                <Paper square>
                    <Tabs value={this.state.currTab} indicatorColor="primary" textColor="primary" onChange={this.onTabChange}>
                        <Tab label="Main" />
                        <Tab label="Skills"  />
                        <Tab label="Items" />
                    </Tabs>
                </Paper>
                <br />

                <Paper style={paperPadding}>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <Warnings data={this.state} />
                        <h3>Save file options</h3>
                        <MainData />

                        <h4>Options</h4>
                        <Options />

                        <h4>Difficulty</h4>
                        <Difficulties />

                        <h4>Starting Act</h4>
                        <Acts />

                        <h4>Quest Rewards (most rewards need to be redeemed manually)</h4>
                        <a href="#" id="checkAll" onClick={this.checkQuestBoxes}>Check All</a>
                        <Quests />

                        <button id="submitButton" type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Paper>
                <br />

                <Paper style={paperPadding}>
                    <h3>Disclaimer</h3>
                    <p>This web application is for educational purposes only and is not meant for creating illegitimate save files. It was created to demonstrate a frontend and backend integration.</p>
                </Paper>
            </div>
        );
    }
}
