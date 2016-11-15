import React from "react";
import { Title } from "../Titles";
import { Application } from "sp-application";

export default class Tictactoe extends React.Component {
    render() {
        return (
            <div className="tictactoe">
                <Title text={Application.localize("tictactoe/title")} />
            </div>
        );
    }
}
