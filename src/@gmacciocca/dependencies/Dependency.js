export default class Dependency {
    constructor(args) {
        Object.keys(args).map(propertyName => {
            this[`_${propertyName}`] = args[propertyName];
        });
    }

    get type() {
        return this._type;
    }

    get roleName() {
        return this._roleName;
    }

    get classType() {
        return this._classType;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        return this._value = newValue;
    }

    get parameters() {
        return this._parameters;
    }
}
