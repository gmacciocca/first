import React from "react";
import { Link } from "react-router";
import { Title, SubTitle } from "./Titles";
import { createApp, destroyApp } from "./ApplicationCreation";
import { Application } from "./@gmacciocca/application";

const Game = ({ id, path }) => (
    <li><Link to={path} >{Application.localize(`${id}/title`)}</Link></li>
);

const GameList = ({ games }) => (
    <ul>
        {games.map((game) => {
            return <Game key={game.id} {...game} />;
        })}
    </ul>
);

const ToggleAppButton = ({ toggleApp }) => (
    <div className="appshell__toggleButtonWrapper" >
        <button className="appshell__toggleButton" autoFocus={true} default={true} onClick={toggleApp}>Toggle Application</button>
    </div>
);

const ShellBody = ({ games }) => (
    <div>
        <Title text={Application.localize("appShell/title")} />
        <SubTitle text={Application.localize("appShell/welcomeMessage")} />
        <GameList games={games} />
    </div>
);

export default class AppShell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [
                { id: "fifteen", path: "fifteen" },
                { id: "tictactoe", path: "tictactoe" }
            ],
            isRunning: Application.hasInstance
        };
    }

    toggleApp() {
        (Application.hasInstance ? destroyApp() : createApp())
            .then(() => {
                this.setState({ isRunning: Application.hasInstance });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div className="appshell">
                {
                    this.state.isRunning ? <ShellBody games={this.state.games} /> : null
                }
                <ToggleAppButton toggleApp={this.toggleApp.bind(this)} />
            </div>
        );
    }
}
