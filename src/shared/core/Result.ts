import { BaseError } from "./BaseError";

export class Result<T = {}, E = BaseError> {

    public getValue(): T {
        return this.value;
    }

    public getError(): E {
        return this.err;
    }

    public readonly hasErrors: boolean;
    public readonly err: E;
    private readonly value: T;

    private constructor(hasErrors: boolean, error?: E, value?: T) {
        if (!(!!value === hasErrors)) {
            throw new Error("[Result Class] : invalid argument passed");
        }

        this.hasErrors = hasErrors;
        this.err = error ?? {} as E;
        this.value = value ?? {} as T;
    }

    public static ok<T>(value: T): Result<T> {
        return new Result<T>(false, undefined, value);
    }

    public static error<E>(err: E): Result<{}, E> {
        return new Result<{}, E>(true, err, undefined);
    }
}