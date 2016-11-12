import DEPENDENCY_TYPES from "./DependencyTypes";
import Dependency from "./Dependency";

export default class DependencyRegistry extends Dependency {
    constructor(roleName, value, ...parameters) {
        super({ type: DEPENDENCY_TYPES.REGISTRY, roleName, value, parameters });
    }
}
