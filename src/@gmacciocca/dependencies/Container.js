export default class Container {
    constructor() {
        this._dependencies = {};
        this._roles = { isRolesContanier: true };
    }

    add(dependency) {
        this._dependencies[dependency.roleName] = dependency;
    }

    forEachDependency(func, type) {
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

    callMethodOnDependencies(methodName, ...args) {
        const promiseArray = Object.keys(this._dependencies)
            .filter(roleName => this._hasFunction(this._dependencies[roleName].value, methodName))
            .map(roleName => {
                const { value } = this._dependencies[roleName];
                const ret = this._callFunction(value, methodName, ...args);
                return ret instanceof Promise ? ret : null;
            });
        return Promise.all(promiseArray);
    }

    _callFunction(obj, funcName, ...others) {
        return obj[funcName](...others);
    }

    _hasFunction(obj, funcName) {
        return obj && typeof obj[funcName] === "function";
    }
}
