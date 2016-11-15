import AppError from "./AppError";

export default class Lifecycle {
    constructor(delegates, components) {
        this._delegates = delegates;
        this._components = components;
        this._dependenciesBuilder = null;
        this._events = null;
        this._uncaughtErrors = null;
    }

    bootstrap() {
        return this._createDelegates()
        .then(() => this._buildDependencies())
        .then(dependencies => {
            this._events.fireWait("application.ready");
            return dependencies;
        })
        .catch(err => {
            throw new AppError("APP.BOOTRSTRAP_ERROR", {
                message: "Application Bootstrap: error.",
                originalError: err
            });
        });
    }

    shutdown() {
        return this._events.fireWait("application.beforeShutdown")
        .then(() => this._shutdownDependencies())
        .then(() => this._events.fireWait("application.shutdown"))
        .catch(err => {
            throw new AppError("APP.SHUTDOWN_ERROR", {
                message: "Application shutdown: Application Shutdown: error.",
                originalError: err
            });
        });
    }

    _createDelegates() {
        return new Promise((resolve, reject) => {
            try {
                this._dependenciesBuilder = this._delegates.createDependenciesBuilder();
                this._events = this._delegates.createEvents();
                this._uncaughtErrors = this._delegates.createUncaughtErrors();
                this._dependenciesBuilder
                    .add({ roleName: "events", value: this._events })
                    .add({ roleName: "uncaughtErrors", value: this._uncaughtErrors });
                resolve();
            } catch (err) {
                reject(new AppError("APP.BOOTRSTRAP_ERROR", {
                    message: "Application Bootstrap: error creating delegates.",
                    originalError: err
                }));
            }
        });
    }

    _buildDependencies() {
        this._components.forEach(component => {
            this._dependenciesBuilder.add(component);
        });
        return this._dependenciesBuilder.build()
        .then(dependencies => {
            this._dependencies = dependencies;
            this._localize = this._dependencies.localize;
            this._storage = this._dependencies.storage;
            return dependencies;
        })
        .catch(err => {
            throw new AppError("APP.BOOTRSTRAP_ERROR", {
                message: "Application Bootstrap: error bootstrapping dependencies.",
                originalError: err
            });
        });
    }

    _shutdownDependencies() {
        delete this._dependenciesBuilder;
    }

}
