export default class Result<T = {}, E = string> {

    public getValue(): T {
        return this.value;
    }


    hasErrors: boolean;
    private value: T;
    error: E;

    private constructor(hasErrors: boolean, value?: T, error ?: E) {
        this.hasErrors = hasErrors;
        this.value = value ?? {} as T;
        this.error = error ?? {} as E;
    }


    public static success<T>(value: T): Result<T> {
        return new Result<T>(false, value);
    }

    public static error<E>(error: E): Result<{}, E> {
        return new Result<{}, E>(true, undefined, error);
    }

}