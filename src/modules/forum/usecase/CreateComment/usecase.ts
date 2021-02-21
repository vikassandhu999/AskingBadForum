import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";

export class CreateCommentEmailUseCase {

    constructor() {
    }

    public async run(params: any , context: any): Promise<any> {
        await this.validateInput(params);

    }

    private async validateInput(params: any): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        verificationToken: {
            presence: true
        }
    }
}