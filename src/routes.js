
import React from "react";
import { Router, Route, hashHistory } from "react-router";
import Main from "./Main";
import Fifteen from "./Fifteen";
import Tictactoe from "./Tictactoe";

export default (
    <Router history={hashHistory} >
        <Route path="/" component={Main} />
        <Route path="/fifteen" component={Fifteen} />
        <Route path="/tictactoe" component={Tictactoe} />
    </Router>
);
