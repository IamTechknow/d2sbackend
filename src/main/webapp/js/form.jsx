import React, {Component} from 'react';

// Implementation of the Form HTML
export default class Form extends Component {

    rewards = {
        den: false,
        imbue: false,
        skillBook: false,
        potion: false,
        lamEsen: false,
        izual: false,
        socket: false,
        scroll: false,
        nAncients: false,
        nmAncients: false,
        hAncients: false
    };

    state = {
        fromForm: false,
        name: "",
        level: 1,
        classNum: 0,
        gold: 0,
        stashGold: 0,
        startingAct: 0,
        expansion: true,
        hardcore: false,
        difficulty: 0,
        invalid: false,
        invalidForClassic: false,
        invalidName: false,
        invalidAct: false,
        invalidAncients: false,
        questRewards: this.rewards
    };

    constructor(props) {
        super(props);

        //FIXME: Find a way to data bind the state variables instead of creating boilerplate functions
        this.setDifficulty = this.setDifficulty.bind(this);
        this.setAct = this.setAct.bind(this);
        this.checkQuestBoxes = this.checkQuestBoxes.bind(this);
    }

    componentDidMount() {
        // If the state is updated, React will call render() to update the DOM
    }

    setDifficulty(event) {
        this.setState({difficulty: event.target.value});
    }

    setAct(event) {
        this.setState({startingAct: event.target.value});
    }

    checkQuestBoxes(event) {
        event.preventDefault();
        var checkboxes = document.querySelector('#questCheckBoxes');
        var quest = checkboxes.querySelectorAll('input[type="checkbox"]');
        for (let box of quest)
            box.checked = "checked";
    }

    //FIXME: Modularize all this, also enable hot-swapping
    //FIXME: Re-enable form POSTing
    render() {
        return (
            <div className="container">
                <h3>Save file options</h3>
                <form action="/" method="post">
                    {this.state.invalidName &&
                        <p className="alert alert-danger">Character name is invalid. It must be 2 to 15 characters long, must begin with a letter, and have up to either one dash or underscore.</p>
                    }
                    {this.state.invalidForClassic &&
                        <p className="alert alert-danger">Invalid character class. The character may not be a Druid or Assassin in Diablo II classic.</p>
                    }
                    {this.state.invalidAct &&
                        <p className="alert alert-danger">Invalid starting act. Act 5 does not exist in Diablo II classic.</p>
                    }
                    {this.state.invalidAncients &&
                        <p className="alert alert-danger">Character level is too low to have completed Ancients for the specified difficulties.</p>
                    }
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="charName">Character Name</label>
                            <input type="text" className="form-control" id="charName" aria-describedby="charHelp" placeholder="Up to 15 characters, no numbers" maxLength="15" value={this.state.name}></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="charName">Character Level</label>
                            <input type="number" className="form-control" id="charLevel" aria-describedby="charHelp" min="1" max="99" value={this.state.level}></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="charClass">Character Class</label>
                        <select className="form-control" id="charClass" value={this.state.classNum}>
                            <option value="0">Amazon</option>
                            <option value="6">Assassin</option>
                            <option value="4">Barbarian</option>
                            <option value="5">Druid</option>
                            <option value="2">Necromancer</option>
                            <option value="3">Paladin</option>
                            <option value="1">Sorceress</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="gold">Gold</label>
                            <input type="number" className="form-control" id="gold" aria-describedby="charHelp" placeholder="Up to 10000 times character level" min="0" value={this.state.gold}></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="stashedGold">Stashed Gold</label>
                            <input type="number" className="form-control" id="stashedGold" aria-describedby="charHelp" placeholder="Up to 2500000" min="0" max="2500000" value={this.state.stashGold}></input>
                        </div>
                    </div>

                    <h4>Options</h4>
                    <div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="expansion" checked={this.state.expansion}></input>
                            <label className="form-check-label" htmlFor="expansion">Expansion</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="hardcore" checked={this.state.hardcore}></input>
                            <label className="form-check-label" htmlFor="hardcore">Hardcore</label>
                        </div>
                    </div>
                    <br />

                    <h4>Difficulty</h4>
                    <div onChange={this.setDifficulty}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="diffRadio" id="normalDifficulty" value="0" checked={true}></input>
                            <label className="form-check-label" htmlFor="normalDifficulty">Normal</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="diffRadio" id="nightmareDifficulty" value="5"></input>
                            <label className="form-check-label" htmlFor="nightmareDifficulty">Nightmare</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="diffRadio" id="hellDifficulty" value="10"></input>
                            <label className="form-check-label" htmlFor="hellDifficulty">Hell</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="diffRadio" id="finishedHell" value="15"></input>
                            <label className="form-check-label" htmlFor="finishedHell">Completed Hell</label>
                        </div>
                    </div>
                    <br />

                    <h4>Starting Act</h4>
                    <div onChange={this.setAct}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="actRadio" id="act1" value="0" checked={true}></input>
                            <label className="form-check-label" htmlFor="act1">Act 1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="actRadio" id="act2" value="1"></input>
                            <label className="form-check-label" htmlFor="act2">Act 2</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="actRadio" id="act3" value="2"></input>
                            <label className="form-check-label" htmlFor="act3">Act 3</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="actRadio" id="act4" value="3"></input>
                            <label className="form-check-label" htmlFor="act4">Act 4</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="actRadio" id="act5" value="4"></input>
                            <label className="form-check-label" htmlFor="act5">Act 5</label>
                        </div>
                    </div>
                    <br />

                    <h4>Quest Rewards (most rewards need to be redeemed manually)</h4>
                    <a href="#" id="checkAll" onClick={this.checkQuestBoxes}>Check All</a>
                    <div id="questCheckBoxes">
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="den" checked={this.state.questRewards.den}></input>
                                <label className="form-check-label" htmlFor="den">Completed Den of Evil for Skill Point and Stats reset</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="imbue" checked={this.state.questRewards.imbue}></input>
                                <label className="form-check-label" htmlFor="imbue">Returned Hordaric Malus</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="skillBook" checked={this.state.questRewards.skillBook}></input>
                                <label className="form-check-label" htmlFor="skillBook">Defeated Radamant for Skill Point</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="goldenbird" checked={this.state.questRewards.goldenbird}></input>
                                <label className="form-check-label" htmlFor="goldenbird">Drank the Potion of Life</label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="lamEsen" checked={this.state.questRewards.lamEsen}></input>
                                <label className="form-check-label" htmlFor="lamEsen">Completed Lam Esen's Tome for five attribute points</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="izual" checked={this.state.questRewards.izual}></input>
                                <label className="form-check-label" htmlFor="izual">Defeated Izual for two skill points</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="socket" checked={this.state.questRewards.socket}></input>
                                <label className="form-check-label" htmlFor="socket">Socket Reward from Larzuk</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="scroll" checked={this.state.questRewards.scroll}></input>
                                <label className="form-check-label" htmlFor="scroll">Read the Scroll of Resistance</label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="nAncients" checked={this.state.questRewards.nAncients}></input>
                                <label className="form-check-label" htmlFor="nAncients">Normal Ancients</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="nmAncients" checked={this.state.questRewards.nmAncients}></input>
                                <label className="form-check-label" htmlFor="nmAncients">Nightmare Ancients</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="hAncients" checked={this.state.questRewards.hAncients}></input>
                                <label className="form-check-label" htmlFor="hAncients">Hell Ancients</label>
                            </div>
                        </div>
                    </div>
                    <br />

                    <button id="submitButton" type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br />

                <h3>Disclaimer</h3>
                <p>This web application is for educational purposes only and is not meant for creating illegitimate save files. It was created to demonstrate a frontend and backend integration.</p>
            </div>
        );
    }
}
