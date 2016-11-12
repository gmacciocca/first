import ReactDOM from "react-dom";
import routes from "./routes";
import { createApp } from "./ApplicationCreation";
import { UncaughtErrors } from "./@gmacciocca/application";

createApp()
.then(() => {
    ReactDOM.render(routes, document.getElementById("mainElement"));
});
