import {BaseError} from "./BaseError";

export class NotEnoughInformationProvidedError extends BaseError {
    constructor() {
        super(`Not enough information provided`, "information", 409);
    }
}