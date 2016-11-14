import DEPENDENCY_TYPES from "./DependencyTypes";
import Dependency from "./Dependency";

export default class DependencyClass extends Dependency {
    constructor(roleName, constr, ...parameters) {
        super({ type: DEPENDENCY_TYPES.CLASS, roleName, constr, parameters });
    }

    get constr() {
        return this._constr;
    }
}
