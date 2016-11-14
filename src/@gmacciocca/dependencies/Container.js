import DependencyValue from "./DependencyValue";
import DependencyClass from "./DependencyClass";

export default class Container {
    constructor() {
        this._dependencies = {};
        this._roles = { isRolesContanier: true };
    }

    // addValue(roleName, value, ...parameters) {
    //     this._dependencies[roleName] = new DependencyValue(roleName, value, ...parameters);
    // }
    //
    // addClass(roleName, constr, ...parameters) {
    //     this._dependencies[roleName] = new DependencyClass(roleName, constr, ...parameters);
    // }

    add({ roleName, value, constr, ...parameters }) {
        this._dependencies[roleName] = constr ?
            new DependencyClass(roleName, constr, ...parameters) :
            new DependencyValue(roleName, value, ...parameters);
        return this;
    }

    // add(dependency) {
    //     this._dependencies[dependency.roleName] = dependency;
    // }

    forEach(type, func) {
        Object.keys(this._dependencies)
        .filter(roleName => type !== undefined ? this._dependencies[roleName].type === type : true)
        .forEach(roleName => func(this._dependencies[roleName]));
    }

    get roles() {
        Object.keys(this._dependencies).forEach(roleName => {
            if (this._dependencies[roleName].value) {
                this._roles[roleName] = this._dependencies[roleName].value;
            }
        });
        return this._roles;
    }



}
