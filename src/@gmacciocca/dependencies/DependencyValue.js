import DEPENDENCY_TYPES from "./DependencyTypes";
import Dependency from "./Dependency";

export default class DependencyValue extends Dependency {
    constructor(roleName, value, ...parameters) {
        super({ type: DEPENDENCY_TYPES.VALUE, roleName, value, parameters });
    }
}
