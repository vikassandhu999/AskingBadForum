import {BaseError} from "./BaseError";

export class NotEnoughInformationProvidedError extends BaseError {
    constructor() {
        super({message : "Missing auth tokens or user information"},409);
    }
}