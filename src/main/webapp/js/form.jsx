import React, { Component } from 'react';

// Material UI Components
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Form Components
import Warnings from './warning';
import MainData from './main';
import Options from './options';
import Acts from './acts';
import Difficulties from './difficulties';
import Quests from './quests';
import Skills from './skills';
import Items from './items';
import * as ClassData from './class-data';

// Padding style for paper components
const paperPadding = {
  padding: '16px',
};

const MAIN = 0, SKILLS = 1, ITEMS = 2, VALID = 0, MAX_LVL = 99, MAX_SKILL_LVL = 20;

// Implementation of the Form HTML
export default class Form extends Component {
  // Calculate the amount of times the character has completed a given quest
  static getTimesCompleted(diff, quest, startingAct, act) {
    const timesBeatGame = Number.parseInt(diff, 10) / 5;
    let timesCompleted = timesBeatGame * (quest ? 1 : 0);
    if (Number.parseInt(startingAct, 10) >= act && quest) {
      timesCompleted += 1;
    }

    return Math.min(3, timesCompleted);
  }

  // Post form data then change the state
  static postData(data) {
    return fetch('/', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      referrer: 'no-referrer',
      body: data,
    }).then(response => response.json());
  }

  constructor(props) {
    super(props);

    const rewards = {};
    ['den', 'imbue', 'skillBook', 'potion', 'lamEsen', 'izual', 'socket',
      'scroll', 'nAncients', 'nmAncients', 'hAncients'].forEach((key) => {
      rewards[key] = false;
    });

    this.state = {
      currTab: MAIN,
      invalidForClassic: false,
      invalidName: false,
      invalidAct: false,
      invalidAncients: false,
      invalidSkills: VALID,
      level: 1,
      classNum: 0,
      difficulty: 0,
      startingAct: 0,
      allocated: new Array(30).fill(0),
      attr: [0, 0, 0, 0],
      rewards,
    };

    this.pattern = new RegExp(/^[a-zA-Z][a-zA-Z_-]*$/);
    this.checkQuestBoxes = this.checkQuestBoxes.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onStatClick = this.onStatClick.bind(this);
  }

  // On Tab change, update data that can be passed onto other tabs, such as skill points
  onTabChange(event, value) {
    this.setState({ currTab: value, skillPoints: this.calcSP() });
  }

  // Handle the two buttons that can increase stats
  onStatClick(event) {
    const { attr } = this.state;

    if (event.target.dataset.mode === '1') {
      const attrLeft = this.calcStats() - attr.reduce((accum, curr) => accum + curr);
      if (attrLeft > 0) attr[event.target.dataset.idx] += attrLeft;
    } else {
      attr[event.target.dataset.idx] += 5;
    }
    this.setState({ attr });
  }

  // Generic form handler that saves data to the overall form state.
  // Handles checkboxes, skill, and attribute values differently
  onFormChange(event) {
    const {
      rewards, allocated, attr, classNum,
    } = this.state;
    const { name, value } = event.target;

    if (event.target.classList[0] === 'rewards') {
      rewards[name] = event.target.checked;
      this.setState({ rewards });
    } else if (event.target.classList[0] === 'opts') {
      this.setState({ [name]: event.target.checked });
    } else if (event.target.classList[0] === 'skill') {
      const idx = Number.parseInt(name.substring(6), 10);
      allocated[idx] = Math.min(MAX_SKILL_LVL, Number.parseInt(value, 10));
      this.setState({ allocated });
    } else if (name === 'level') {
      this.setState({ [name]: Math.min(MAX_LVL, Number.parseInt(value, 10)).toString() });
    } else if (event.target.classList[0] === 'attr') {
      const map = {
        str: 0, dex: 1, vit: 2, nrg: 3,
      };
      const idx = map[name];

      attr[idx] = Number.parseInt(value, 10) - ClassData[classNum].attributes[idx];
      this.setState({ attr });
    } else {
      this.setState({ [name]: typeof value === 'number' ? Number.parseInt(value, 10) : value });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { attr, rewards, allocated } = this.state;

    // Validate name, class, act, Ancients quest
    const data = new FormData(event.target);
    const name = data.get('name');
    const level = Number.parseInt(data.get('level'), 10);
    const expansion = data.get('expansion') === 'on';

    const nAncients = data.get('nAncients') === 'on';
    const nmAncients = data.get('nmAncients') === 'on';
    const hAncients = data.get('hAncients') === 'on';

    const invalidName = name.length < 2 || name.length > 15 || !this.pattern.test(name);
    const invalidForClassic = Number.parseInt(data.get('classNum'), 10) >= 5 && !expansion;
    const invalidAct = Number.parseInt(data.get('startingAct'), 10) > 3 && !expansion;
    const invalidAncients = (nAncients && level < 20)
        || (nmAncients && level < 40) || (hAncients && level < 60);
    const invalidSkills = this.checkSkills();
    const invalidStats = this.checkStats();

    // Fix progression for Classic mode
    if (!expansion) {
      const difficulty = data.get('difficulty');
      data.set('difficulty', difficulty - (difficulty / 5));
    }

    const invalid = invalidName || invalidForClassic || invalidAct
        || invalidAncients || invalidSkills > 0 || invalidStats > 0;
    this.setState({
      invalidName,
      invalidForClassic,
      invalidAct,
      invalidAncients,
      invalidSkills,
      invalidStats,
    });

    // Modify the form data to be compatible with Spring's form serialization
    data.delete('nAncients'); data.delete('nmAncients'); data.delete('hAncients');

    for (let i = 0, key = ['str', 'dex', 'vit', 'nrg']; i < attr.length; i += 1) {
      data.delete(key[i]);
      data.set(key[i], attr[i]);
    }

    Object.keys(rewards).forEach(((key) => {
      data.set(`rewards.${key}`, rewards[key]);
    }));

    for (let i = 0; i < allocated.length; i += 1) {
      data.set(`skills[${i}]`, allocated[i]);
    }

    // Use fetch API here, and then change the state to re-render/re-direct the page
    if (!invalid) {
      Form.postData(data)
        .then((response) => {
          this.setState({
            valid: response.valid,
            link: response.link || '',
          });
        })
        .catch((err) => { throw err; });
    }
  }

  // Check each box and populate a rewards object that indicates all boxes are set
  checkQuestBoxes(event) {
    event.preventDefault();
    const checkboxes = document.querySelector('#questCheckBoxes');
    const quest = checkboxes.querySelectorAll('input[type="checkbox"]');
    const rewards = {};

    for (let i = 0; i < quest.length; i += 1) {
      quest[i].checked = 'checked';
      rewards[quest[i].name] = true;
    }
    this.setState({ rewards });
  }

  // Check skill point allocation, and dependencies are being met
  checkSkills() {
    const { allocated, classNum, level } = this.state;
    const INVALID_NO_SP = 1, INVALID_LEVEL_LOW = 2, INVALID_DEPS = 3;
    const spLeft = this.calcSP() - allocated.reduce((accum, curr) => accum + curr);
    if (spLeft < 0) {
      return INVALID_NO_SP;
    }

    const { skills } = ClassData[classNum];
    const offset = [6, 36, 66, 96, 126, 221, 251][classNum];

    for (let i = 0; i < allocated.length; i += 1) {
      if (allocated[i] > 0) {
        // Level too low for skill level
        if (skills[i].level + allocated[i] > level) {
          return INVALID_LEVEL_LOW;
        }

        const { deps } = skills[i];
        for (let j = 0; j < deps.length; j += 1) {
          if (allocated[deps[j] - offset] < 1) {
            return INVALID_DEPS;
          }
        }
      }
    }
    return VALID;
  }

  // Check stat point allocation. Error numbers exist for going below base value of each stat
  checkStats() {
    const { attr } = this.state;
    const INVALID_NEG_ATTR = 1, STAT_BELOW_BASE = 2;
    const attrLeft = this.calcStats() - attr.reduce((accum, curr) => accum + curr);
    if (attrLeft < 0) {
      return INVALID_NEG_ATTR;
    }

    for (let i = 0; i < attr.length; i += 1) {
      // stat points user allocated, so don't compare with base
      if (attr[i] < 0) {
        return STAT_BELOW_BASE + i;
      }
    }

    return VALID;
  }

  calcStats() { // Total number of stat points to spend
    const {
      difficulty, rewards, startingAct, level,
    } = this.state;
    const ACT3 = 2;
    const lamEsen = Form.getTimesCompleted(difficulty,
      rewards.lamEsen, startingAct, ACT3);
    return 5 * (level - 1 + lamEsen);
  }

  calcSP() {
    const {
      difficulty, rewards, startingAct, level,
    } = this.state;
    const ACT2 = 1;
    const timesReadSkillBook = Form.getTimesCompleted(difficulty,
      rewards.skillBook, startingAct, ACT2);
    return level - 1 + timesReadSkillBook;
  }

  render() {
    const {
      invalidForClassic, invalidName, invalidAct, invalidAncients, invalidSkills,
      invalidStats, classNum, skillPoints,
      difficulty, startingAct, allocated, valid, link, currTab, rewards,
    } = this.state;

    if (valid) {
      return (
        <div className="container">
          <h1>Save created!</h1>
          <a href={link}>Download this save</a>
          {' '}
          <br />
          <a href="/">Create another save</a>
        </div>
      );
    } if (link === '' && !valid) {
      return (
        <div className="container">
          <h1>Save not created - something went wrong!</h1>
          <a href="/">Create another save</a>
        </div>
      );
    }

    // Pass the state of the form to the main components and the on change handler to change state
    // The Paper component accepts an object to apply CSS styling
    return (
      <div className="container">
        <Paper square>
          <Tabs
            value={currTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.onTabChange}
            centered
          >
            <Tab label="Main" />
            <Tab label="Skills" />
            <Tab label="Items" />
            <Tab label="Mercenary" />
          </Tabs>
        </Paper>
        <br />

        <Paper style={paperPadding}>
          <form onSubmit={this.onSubmit} noValidate>
            {currTab === MAIN
                && (
                <React.Fragment>
                  <Warnings
                    invalidForClassic={invalidForClassic}
                    invalidName={invalidName}
                    invalidAct={invalidAct}
                    invalidAncients={invalidAncients}
                    invalidSkills={invalidSkills}
                    invalidStats={invalidStats}
                  />
                  <h3>Save file options</h3>
                  <MainData
                    data={this.state}
                    stats={this.calcStats()}
                    handler={this.onFormChange}
                    btnHandler={this.onStatClick}
                  />

                  <h4>Options</h4>
                  <Options
                    data={this.state}
                    handler={this.onFormChange}
                  />

                  <h4>Difficulty</h4>
                  <Difficulties
                    currDiff={difficulty}
                    handler={this.onFormChange}
                  />

                  <h4>Starting Act</h4>
                  <Acts
                    currAct={startingAct}
                    handler={this.onFormChange}
                  />

                  <h4>Quest Rewards (most rewards need to be redeemed manually)</h4>
                  <button type="button" id="checkAll" onClick={this.checkQuestBoxes}>Check All</button>
                  <Quests
                    data={rewards}
                    handler={this.onFormChange}
                  />
                </React.Fragment>
                )
              }

            {
                currTab === SKILLS
                && (
                <Skills
                  classNum={classNum}
                  allocated={allocated}
                  skillPoints={skillPoints}
                  handler={this.onFormChange}
                />
                )
              }
            {
                currTab === ITEMS
                && (
                <Items
                  data={this.state}
                  handler={this.onFormChange}
                />
                )
              }

            <button id="submitButton" type="submit" className="btn btn-primary">Submit</button>
          </form>
        </Paper>
        <br />

        <Paper style={paperPadding}>
          <h3>Disclaimer</h3>
          <p>
            This web application is for educational purposes only and is not
            meant for creating illegitimate save files.
            It was created to demonstrate a frontend and backend integration.
          </p>
        </Paper>
      </div>
    );
  }
}
