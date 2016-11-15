import AppError from "./AppError";
import Lifecycle from "./Lifecycle";

let _instance;

export default class Application {
    constructor(delegates, components, configuration) {
        if (_instance) {
            throw new AppError("APP.ALREADY_INSTANTIATED", {
                message: "Application constructor: App is already instantiated."
            });
        }
        _instance = this;
        this._configuration = configuration;
        this._lifecycle = new Lifecycle(delegates, components);
        this._localize = null;
        this._storage = null;
    }

    static create(...args) {
        return new Application(...args);
    }

    destroy() {
        _instance = null;
    }

    bootstrap() {
        return this._lifecycle.bootstrap()
            .then(dependencies => {
                this._localize = dependencies.localize;
                this._storage = dependencies.storage;
            });
    }

    shutdown() {
        return this._lifecycle.shutdown();
    }

    localize(...args) {
        return this._localize.localize(...args);
    }

    get storage() {
        return this._storage;
    }

    get configuration() {
        return this._configuration;
    }

    static get hasInstance() {
        return !!_instance;
    }

    static instance() {
        if (!_instance) {
            throw new AppError("APP.NOT_INSTANTIATED", {
                message: "Application instance: App is not instantiated."
            });
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

    static get storage() {
        return Application.instance().storage;
    }

    static get configuration() {
        return Application.instance().configuration();
    }
}
