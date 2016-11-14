import { Application, Delegates, UncaughtErrors } from "./@gmacciocca/application";
import { Builder, DependencyClass, DependencyValue } from "./@gmacciocca/dependencies";
import Events from "@gmacciocca/events";
import Localize from "@gmacciocca/localize";
import { Storage, storeFactory } from "@gmacciocca/storage";
import loadJsonResource from "./loadJsonResource";

const configuration = {
    localize: {
        resource: "./resources/en-us.json"
    },
    storage: {
        schemas: {
            "localStorage" : {
                "user": ["name", "age"],
            },
            "sessionStorage": {
                "lastGame": ["name", "data" ]
            }
        }
    }
};

const getComponents = (locResource) => {
    return [
        new DependencyValue("sessionStorage", global.sessionStorage),
        new DependencyValue("localStorage", global.localStorage),
        new DependencyValue("storeFactory", storeFactory),
        new DependencyClass("storage", Storage, configuration.storage),
        new DependencyClass("localize", Localize, locResource)
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
        // ,
        // createLocalize() {
        //     return new Localize(locResource);
        // }
    });
};

const createApp = () => {
    return loadJsonResource(configuration.localize.resource)
    .then(locResource => {
        const delegates = getDelegates();
        const components = getComponents(locResource);

        Application.create(delegates, components, configuration);
        return Application.bootstrap();
    })
    .catch(err => {
        console.error(err); // eslint-disable-line no-console
        throw err;
    });
};

const destroyApp = () => {
    return Application.shutdown()
    .then(() => {
        Application.destroy();
    })
    .catch(err => {
        console.error(err); // eslint-disable-line no-console
        throw err;
    });
};

export { createApp, destroyApp };
