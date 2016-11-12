import DEPENDENCY_TYPES from "./DependencyTypes";
import Dependency from "./Dependency";

export default class DependencyClass extends Dependency {
    constructor(roleName, classType, ...parameters) {
        super({ type: DEPENDENCY_TYPES.CLASS, roleName, classType, parameters });
    }
}
