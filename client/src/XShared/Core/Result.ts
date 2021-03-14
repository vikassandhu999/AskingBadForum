import {BaseError} from "./BaseError";


export default class Result<T> {
    hasError: boolean;
    value: T | undefined;
    error: BaseError | undefined;
    constructor(hasError: boolean, value?: T, error?: BaseError) {
        this.hasError = hasError;
        this.value = value;
        this.error = error;
    }

    static success<T>(value: T): Result<T> {
        return new Result<T>(false, value);
    }

    static fail<T>(error: BaseError): Result<T> {
        return new Result<T>(true, undefined, error);
    }
}