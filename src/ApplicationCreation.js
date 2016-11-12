import { Application, Delegates, UncaughtErrors } from "./@gmacciocca/application";
import { Builder, DependencyClass, DependencyValue } from "./@gmacciocca/dependencies";
import Events from "@gmacciocca/events";
import Localize from "@gmacciocca/localize";
import Storage from "@gmacciocca/storage";
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
        new DependencyValue("uncaughtErrors", new UncaughtErrors()),
        new DependencyValue("sessionStorage", global.sessionStorage),
        new DependencyValue("localStorage", global.localStorage),
        new DependencyClass("events", Events),
        new DependencyClass("localize", Localize, locResource),
        new DependencyClass("storage", Storage, configuration.storage)
    ];
};

const getDelegates = () => {
    return new Delegates({
        createEvents({ events }) {
            return events;
        },
        createUncaughtErrors({ uncaughtErrors }) {
            return uncaughtErrors;
        },
        createDependenciesBuilder() {
            return new Builder();
        },
        createLocalize({ localize }) {
            return localize;
        }
    });
};

const createApp = () => {
    return loadJsonResource(configuration.localize.resource)
    .then(locResource => {
        const components = getComponents(locResource);
        const delegates = getDelegates();
        Application.create(components, delegates, configuration);
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
