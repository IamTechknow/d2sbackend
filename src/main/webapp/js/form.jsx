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
import Skills from './skills.jsx';
import * as ClassData from './class-data.jsx';

// Padding style for paper components
const paperPadding = {
  padding: '16px',
};

const MAIN = 0, SKILLS = 1, ITEMS = 2;

// Implementation of the Form HTML
export default class Form extends Component {
    // Default form values
    state = {
        currTab: MAIN,
        invalid: false,
        invalidForClassic: false,
        invalidName: false,
        invalidAct: false,
        invalidAncients: false,
        invalidSkills: false,
        name: '',
        level: 1,
        gold: 0,
        stashGold: 0,
        classNum: "0",
        expansion: true,
        hardcore: false,
        difficulty: "0",
        startingAct: "0",
        rewards : {},
        allocated: new Array(30).fill(0, 0, 30),
    };

    constructor(props) {
        super(props);

        this.pattern = new RegExp(/^[a-zA-Z][a-zA-Z_-]*$/);
        this.checkQuestBoxes = this.checkQuestBoxes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }

    // Check each box and populate a rewards object that indicates all boxes are set
    checkQuestBoxes(event) {
        event.preventDefault();
        var checkboxes = document.querySelector('#questCheckBoxes');
        var quest = checkboxes.querySelectorAll('input[type="checkbox"]');
        var rewards = {};

        for (let box of quest) {
            box.checked = "checked";
            rewards[box.name] = true;
        }
        this.setState({"rewards" : rewards});
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

    checkSkills() {
        //Check skill point allocation


        //Check skill dependencies are being met


        return false;
    }

    calcSP() {
        let ACT2 = 1;
        let timesBeatGame = Number.parseInt(this.state.difficulty) / 5;
        var timesKilledRadamant = timesBeatGame * (this.state.rewards.skillBook ? 1 : 0);
        if(Number.parseInt(this.state.startingAct) >= ACT2 && this.state.rewards.skillBook)
            timesKilledRadamant++;
        timesKilledRadamant = Math.min(3, timesKilledRadamant);

        return this.state.level - 1 + timesKilledRadamant;
    }

    onTabChange(event, value) {
        //On Tab change, update data that can be passed onto other tabs, such as skill points
        this.setState({currTab: value, skillPoints: this.calcSP()});
    }

    //Generic form handler that saves data to the overall form state. Handles quest data by copying the current object
    onFormChange(event) {
        if(event.target.classList[0] === "rewards") {
            let rewards = Object.assign({}, this.state.rewards);
            rewards[event.target.name] = event.target.checked;
            this.setState({"rewards" : rewards});
        } else if(event.target.classList[0] === "opts") {
            this.setState({ [event.target.name] : event.target.checked });
        } else if(event.target.classList[0] === "skill") {
            let arr = this.state.allocated.slice();
            let idx = Number.parseInt(event.target.name.substring(6));
            arr[idx] = Number.parseInt(event.target.value);
            this.setState({ "allocated" : arr });
        } else {
            this.setState({ [event.target.name]: event.target.value }); // Parse Integer when needed, not now
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        // Validate name, class, act, Ancients quest
        const data = new FormData(event.target);
        var name = data.get("name"), level = parseInt(data.get("level"));
        var expansion = data.get("expansion") === "on";
        var nAncients = data.get("nAncients") === "on", nmAncients = data.get("nmAncients") === "on", hAncients = data.get("hAncients") === "on";

        var invalidName = name.length < 2 || name.length > 15 || !this.pattern.test(name),
            invalidForClassic = parseInt(data.get("classNum")) >= 5 && !expansion,
            invalidAct = parseInt(data.get("startingAct")) > 3 && !expansion,
            invalidAncients = (nAncients && level < 20) || (nmAncients && level < 40) || (hAncients && level < 60);
            invalidSkills = checkSkills();

        // Fix progression for Classic mode
        if(!expansion) {
            var difficulty = data.get("difficulty");
            data.set("difficulty", difficulty - (difficulty / 5));
        }

        this.setState({
            invalid: invalidName || invalidForClassic || invalidAct || invalidAncients || invalidSkills,
            invalidName: invalidName,
            invalidForClassic: invalidForClassic,
            invalidAct: invalidAct,
            invalidAncients: invalidAncients,
            invalidSkills: invalidSkills
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

        // Pass the state of the form to the main components and the on change handler to change state
        // The Paper component accepts an object to apply CSS styling
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
                        {this.state.currTab === MAIN &&
                            <React.Fragment>
                                <Warnings data={this.state} />
                                <h3>Save file options</h3>
                                <MainData data={this.state} formHandler={this.onFormChange.bind(this)} />

                                <h4>Options</h4>
                                <Options data={this.state} formHandler={this.onFormChange.bind(this)} />

                                <h4>Difficulty</h4>
                                <Difficulties data={this.state} formHandler={this.onFormChange.bind(this)} />

                                <h4>Starting Act</h4>
                                <Acts data={this.state} formHandler={this.onFormChange.bind(this)} />

                                <h4>Quest Rewards (most rewards need to be redeemed manually)</h4>
                                <a href="#" id="checkAll" onClick={this.checkQuestBoxes}>Check All</a>
                                <Quests data={this.state.rewards} formHandler={this.onFormChange.bind(this)} />
                            </React.Fragment>
                        }

                        {this.state.currTab === SKILLS && <Skills data={this.state} formHandler={this.onFormChange.bind(this)} />}

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
