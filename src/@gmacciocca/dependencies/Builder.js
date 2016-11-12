import Container from "./Container";
import DEPENDENCY_TYPES from "./DependencyTypes";
import DependencyValue from "./DependencyValue";
import DependencyClass from "./DependencyClass";

export default class Builder {
    constructor() {
        this._container = new Container;
    }

    get DependencyClass() { return DependencyClass; }
    get DependencyValue() { return DependencyValue; }

    add(...args) {
        return this._container.add(...args);
    }

    build() {
        return new Promise((resolve, reject) => {
            try {
                this._container.forEachDependency(dep => {
                    const { classType, parameters } = dep;
                    dep.value = new classType(this._container.roles, ...parameters);
                }, DEPENDENCY_TYPES.CLASS);

                this._container.callMethodOnDependencies("asyncInitialize")
                .then(() => {
                    resolve(this._container.roles);
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}
