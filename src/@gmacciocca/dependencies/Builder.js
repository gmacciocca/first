import Container from "./Container";
import DEPENDENCY_TYPES from "./DependencyTypes";

export default class Builder {
    constructor() {
        this._container = new Container;
    }

    add(...args) {
        return this._container.add(...args);
    }

    build() {
        return new Promise((resolve, reject) => {
            try {
                this._createDepencencyClasses();
                resolve(this._container.roles);
            } catch (err) {
                reject(new Error("Builder: error creating dependencies: ". err.toString()));
            }
        });
    }

    _createDepencencyClasses() {
        this._container.forEach(DEPENDENCY_TYPES.CLASS, dependency => {
            const { constr, parameters } = dependency;
            dependency.value = new constr(this._container.roles, ...parameters);
        });
    }
}
