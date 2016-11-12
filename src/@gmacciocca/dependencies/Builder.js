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
                this._container.forEachDependency(DEPENDENCY_TYPES.CLASS, dependency => {
                    const { classType, parameters } = dependency;
                    dependency.value = new classType(this._container.roles, ...parameters);
                });
                resolve(this._container.roles);
            } catch (err) {
                reject(err);
            }
        });
    }
}
