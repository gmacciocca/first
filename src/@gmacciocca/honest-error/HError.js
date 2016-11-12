export default class HError {
    constructor(code, { message, details } = {}) {
        this._code = code;
        this._message = message || "";
        this._details = details || {};
    }

    isError(code) {
        return this._code === code;
    }

    get code() {
        return this._code;
    }

    get message() {
        return this._message;
    }

    get details() {
        return this._details;
    }

    toString() {
        return `Error ${this._code}: ${this._message} ${this._details.toString()}`;
    }

    setCodes(codes) {
        this._codes = codes;
    }
}
