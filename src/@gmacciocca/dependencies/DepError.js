import HError from "honest-error";

const CODES = [
    "DEP.BUILD_ERROR"
];

export default class DepError extends HError {
    constructor(...args) {
        super(...args);
        this.setCodes(CODES);
    }
}
