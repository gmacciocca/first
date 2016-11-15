import { Application, Delegates, UncaughtErrors } from "sp-application";
import { Builder, DependencyClass, DependencyValue } from "dependency-theory";
import Events from "life-events";
import Localize from "lingo-localize";
import { Storage, storeFactory } from "basement-storage";
import loadJsonResource from "./loadJsonResource";

const configuration = {
    localize: {
        resource: "./resources/en-us.json"
    },
    storage: {
        schemas: {
            "storage.localStorage" : {
                "user": ["name", "age"],
            },
            "storage.sessionStorage": {
                "lastGame": ["name", "data" ]
            }
        }
    }
};

const getComponents = (locResource) => {
    return [
        new DependencyValue("storage.sessionStorage", global.sessionStorage),
        new DependencyValue("storage.localStorage", global.localStorage),
        new DependencyValue("storage.storeFactory", storeFactory),

        new DependencyValue("storage.schemas", configuration.storage.schemas),
        new DependencyClass("storage", Storage),

        new DependencyValue("localize.resource", locResource),
        new DependencyClass("localize", Localize)
    ];
};

const getDelegates = () => {
    return new Delegates({
        createEvents() {
            return new Events();
        },
        createUncaughtErrors() {
            return new UncaughtErrors();
        },
        createDependenciesBuilder() {
            return new Builder();
        }
    });
};

const createApp = () => {
    return loadJsonResource(configuration.localize.resource)
    .then(locResource => {
        const delegates = getDelegates();
        const components = getComponents(locResource);

        Application.create(delegates, components, configuration);
        return Application.bootstrap()
            .then(() => {
                Application.storage.stores.user.set("002", { name: "Peter", age: 27 });
                Application.storage.stores.lastGame.set("002", { name: "Fifteen", date: { when: "now", where: "here", who: "me" } });
            });
    })
    .catch(err => {
        console.error(err.toString()); // eslint-disable-line no-console
        throw err;
    });
};

const destroyApp = () => {
    Application.storage.stores.user.clear();
    Application.storage.stores.lastGame.clear();
    return Application.shutdown()
    .then(() => {
        Application.destroy();
    })
    .catch(err => {
        console.error(err.toString()); // eslint-disable-line no-console
        throw err;
    });
};

export { createApp, destroyApp };
