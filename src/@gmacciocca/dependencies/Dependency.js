export default class Dependency {
    constructor(args) {
        Object.keys(args).map(propertyName => {
            Object.defineProperty(this, propertyName, {
                enumerable: true,
                get: () => this[`_${propertyName}`],
                set: (value) => this[`_${propertyName}`] = value
            });
            this[propertyName] = args[propertyName];
        });
    }
}
