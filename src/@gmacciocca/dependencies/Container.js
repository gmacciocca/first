export default class Container {
    constructor() {
        this._dependencies = {};
        this._roles = { isRolesContanier: true };
    }

    add(dependency) {
        this._dependencies[dependency.roleName] = dependency;
    }

    forEachDependency(type, func) {
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
