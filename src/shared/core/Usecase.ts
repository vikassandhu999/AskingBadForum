import validate from "validate.js";
import { assert } from "./Assert";
import { InvalidParamsError } from "./InvalidParamsError";

export abstract class UseCase<D, R> {
    private readonly inputValidation: boolean;

    protected constructor(inputValidation?: boolean) {
        this.inputValidation = inputValidation ?? true;
    }

    protected abstract inputConstraints: any;

    protected abstract runImpl(params: D, context: any): Promise<R>;

    public async run(params: D, context: any): Promise<R> {
        if (this.inputValidation) {
            await this.validateInput(params);
        }
        return await this.runImpl(params, context);
    }

    protected async validateInput(params: D): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        assert(!validation, new InvalidParamsError(validation));
    }
}