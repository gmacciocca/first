import AppError from "./AppError";

export default class Delegates {
    constructor(externalDelegates) {
        Object.assign(this, externalDelegates);
    }
    createEvents(/*roles*/) {
        throw new AppError("APP.APP.MISSING_DELEGATE", { message: "Events delegate is required." });
    }
    createUncaughtErrors(/*roles*/) {
        throw new AppError("APP.APP.MISSING_DELEGATE", { message: "UncaughtErrors delegate is required." });
    }
    createDependenciesBuilder() {
        throw new AppError("APP.APP.MISSING_DELEGATE", { message: "DependenciesBuilder delegate is required." });
    }
    createLocalize(/*roles*/) {
        throw new AppError("APP.APP.MISSING_DELEGATE", { message: "Localization delegate is required." });
    }
    createStorage(/*roles*/) {
        throw new AppError("APP.APP.MISSING_DELEGATE", { message: "Storage delegate is required." });
    }
}
