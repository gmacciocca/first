import AppError from "./AppError";

let _instance;

export default class Application {
    constructor(components, delegates, configuration) {
        if (_instance) {
            throw new AppError("APP.ALREADY_INSTANTIATED", { message: "Application constructor: App is already instantiated." });
        }
        _instance = this;
        this._configuration = configuration;
        this._delegates = delegates;
        this._components = components;
        this._events = null;
        this._localize = null;
    }

    static create(...args) {
        return new Application(...args);
    }

    destroy() {
        if (!_instance) {
            throw new AppError("APP.NOT_INSTANTIATED", { message: "Application destroy: App is not instantiated." });
        }
        _instance = null;
    }

    bootstrap() {
        return this._createDependenciesBuilder()
        .then(() => this._buildDependencies())
        .then(() => this._createDelegates())
        .then(() => this._events.fireWait("application.ready"))
        .catch(err => {
            throw new AppError("APP.BOOTRSTRAP_ERROR", { message: `Application Bootstrap: error ${err.toString()}` });
        });
    }

    shutdown() {
        return this._events.fireWait("application.beforeShutdown")
        .then(() => this._shutdownDependencies())
        .then(() => this._events.fireWait("application.shutdown"))
        .catch(err => {
            throw new AppError("APP.SHUTDOWN_ERROR", { message: `Application Shutdown: error: ${err.toString()}` });
        });
    }

    localize(...args) {
        return this._localize.localize(...args);
    }

    get configuration() {
        return this._configuration;
    }

    static get hasInstance() {
        return !!_instance;
    }

    static instance() {
        if (!_instance) {
            throw new AppError("APP.NOT_INSTANTIATED", { message: "Application instance: App is not instantiated." });
        }
        return _instance;
    }

    static bootstrap(...args) {
        return Application.instance().bootstrap(...args);
    }

    static shutdown(...args) {
        return Application.instance().shutdown(...args);
    }

    static destroy(...args) {
        return Application.instance().destroy(...args);
    }

    static localize(...args) {
        return Application.instance().localize(...args);
    }

    static get configuration() {
        return Application.instance().configuration();
    }

    _createDependenciesBuilder() {
        return new Promise(resolve => {
            resolve(this._dependenciesBuilder = this._delegates.createDependenciesBuilder());
        });
    }

    _buildDependencies() {
        this._components.forEach(component => this._dependenciesBuilder.add(component));
        return this._dependenciesBuilder.build()
        .then(roles => {
            this._roles = roles;
        })
        .catch(err => {
            throw new AppError("APP.BOOTRSTRAP_ERROR", { message: `Application Bootstrap: error bootstrapping dependencies: ${err.toString()}` });
        });
    }

    _createDelegates() {
        return new Promise(resolve => {
            this._events = this._delegates.createEvents(this._roles);
            this._uncaughtErrors = this._delegates.createUncaughtErrors(this._roles);
            this._localize = this._delegates.createLocalize(this._roles);
            resolve();
        });
    }

    _shutdownDependencies() {
        delete this._dependenciesBuilder;
    }
}
