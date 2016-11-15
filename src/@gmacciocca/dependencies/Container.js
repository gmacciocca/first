import DependencyValue from "./DependencyValue";
import DependencyClass from "./DependencyClass";

export default class Container {
    constructor() {
        this._dependencies = {};
        this._dependencies = { isDependenciesContanier: true };
    }

    add({ roleName, value, constr, ...parameters }) {
        this._dependencies[roleName] = constr ?
            new DependencyClass(roleName, constr, ...parameters) :
            new DependencyValue(roleName, value, ...parameters);
        return this;
    }

    forEach(type, func) {
        Object.keys(this._dependencies)
        .filter(roleName => type !== undefined ? this._dependencies[roleName].type === type : true)
        .forEach(roleName => func(this._dependencies[roleName]));
    }

    get dependencies() {
        Object.keys(this._dependencies).forEach(roleName => {
            if (this._dependencies[roleName].value) {
                this._dependencies[roleName] = this._dependencies[roleName].value;
            }
        });
        return this._dependencies;
    }



}
