import React, {Component} from 'react';

// Implementation of the Form HTML
export default class Form extends Component {
    state = {
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

    handleSubmit(event) {
        event.preventDefault();

        //Validate name, class, act, Anicents quest
        const data = new FormData(event.target);
        var level = parseInt(data.get("level"));
        var expansion = data.get("exp") === "on";
        var nAncients = data.get("nAncients") === "on", nmAncients = data.get("nmAncients") === "on", hAncients = data.get("hAncients") === "on";

        var invalidName = !this.pattern.test(data.get("name")),
            invalidForClassic = parseInt(data.get("charClass")) >= 5 && !expansion,
            invalidAct = parseInt(data.get("act")) > 3 && !expansion,
            invalidAncients = (nAncients && level < 20) || (nmAncients && level < 40) || (hAncients && level < 60);

        this.setState({
            invalid: invalidName || invalidForClassic || invalidAct || invalidAncients,
            invalidName: invalidName,
            invalidForClassic: invalidForClassic,
            invalidAct: invalidAct,
            invalidAncients: invalidAncients
        });

        //when done, use fetch API here
        if(!this.state.invalid) {

        }
    }

    //FIXME: Modularize all this, also enable hot-swapping
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} noValidate>
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
                    <h3>Save file options</h3>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="charName">Character Name</label>
                            <input type="text" className="form-control" id="charName" name="name" placeholder="Up to 15 characters, no numbers" maxLength="15"></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="charLevel">Character Level</label>
                            <input type="number" className="form-control" id="charLevel" name="level" min="1" max="99" defaultValue="1"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="charClass">Character Class</label>
                        <select className="form-control" id="charClass" name="charClass" defaultValue="0">
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
                            <input type="number" className="form-control" name="gold" id="gold" min="0" defaultValue="0"></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="stashedGold">Stashed Gold</label>
                            <input type="number" className="form-control" name="stashedGold" id="stashedGold" min="0" max="2500000" defaultValue="0"></input>
                        </div>
                    </div>

                    <h4>Options</h4>
                    <div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="exp" id="exp" defaultChecked></input>
                            <label className="form-check-label" htmlFor="exp">Expansion</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="hc" id="hc"></input>
                            <label className="form-check-label" htmlFor="hc">Hardcore</label>
                        </div>
                    </div>
                    <br />

                    <h4>Difficulty</h4>
                    <div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="diff" id="normalDifficulty" value="0" defaultChecked></input>
                            <label className="form-check-label" htmlFor="normalDifficulty">Normal</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="diff" id="nightmareDifficulty" value="5"></input>
                            <label className="form-check-label" htmlFor="nightmareDifficulty">Nightmare</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="diff" id="hellDifficulty" value="10"></input>
                            <label className="form-check-label" htmlFor="hellDifficulty">Hell</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="diff" id="finishedHell" value="15"></input>
                            <label className="form-check-label" htmlFor="finishedHell">Completed Hell</label>
                        </div>
                    </div>
                    <br />

                    <h4>Starting Act</h4>
                    <div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="act" id="act1" value="0" defaultChecked></input>
                            <label className="form-check-label" htmlFor="act1">Act 1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="act" id="act2" value="1"></input>
                            <label className="form-check-label" htmlFor="act2">Act 2</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="act" id="act3" value="2"></input>
                            <label className="form-check-label" htmlFor="act3">Act 3</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="act" id="act4" value="3"></input>
                            <label className="form-check-label" htmlFor="act4">Act 4</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="act" id="act5" value="4"></input>
                            <label className="form-check-label" htmlFor="act5">Act 5</label>
                        </div>
                    </div>
                    <br />

                    <h4>Quest Rewards (most rewards need to be redeemed manually)</h4>
                    <a href="#" id="checkAll" onClick={this.checkQuestBoxes}>Check All</a>
                    <div id="questCheckBoxes">
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="den" id="den"></input>
                                <label className="form-check-label" htmlFor="den">Completed Den of Evil for Skill Point and Stats reset</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="imbue" id="imbue"></input>
                                <label className="form-check-label" htmlFor="imbue">Returned Hordaric Malus</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="skillBook" id="skillBook"></input>
                                <label className="form-check-label" htmlFor="skillBook">Defeated Radamant for Skill Point</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="goldenbird" id="goldenbird"></input>
                                <label className="form-check-label" htmlFor="goldenbird">Drank the Potion of Life</label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="lamEsen" id="lamEsen"></input>
                                <label className="form-check-label" htmlFor="lamEsen">Completed Lam Esen's Tome for five attribute points</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="izual" id="izual"></input>
                                <label className="form-check-label" htmlFor="izual">Defeated Izual for two skill points</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="socket" id="socket"></input>
                                <label className="form-check-label" htmlFor="socket">Socket Reward from Larzuk</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="scroll" id="scroll"></input>
                                <label className="form-check-label" htmlFor="scroll">Read the Scroll of Resistance</label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="nAncients" id="nAncients"></input>
                                <label className="form-check-label" htmlFor="nAncients">Normal Ancients</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="nmAncients" id="nmAncients"></input>
                                <label className="form-check-label" htmlFor="nmAncients">Nightmare Ancients</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="hAncients" id="hAncients"></input>
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
