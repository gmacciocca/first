import React from "react";
import { Title } from "../Titles";
import { Application } from "sp-application";

export default class Fifteen extends React.Component {
    render() {
        Application.instance();
        Application.hasInstance;
        return (
            <div className="fifteen">
                <Title text={Application.localize("fifteen/title")} />
            </div>
        );
    }
}
