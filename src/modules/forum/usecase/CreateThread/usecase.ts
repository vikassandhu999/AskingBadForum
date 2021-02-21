import validate from "validate.js";
import {BaseError} from "../../../../shared/core/BaseError";
import {CreateThreadDTO} from "./types";
import {Utils} from "../../../../shared/core/Utils";
import {UserContext} from "../../../user/domain/UserContext";
import {AssertContext} from "../../../../shared/core/AssertContext";

export class CreateThreadEmailUseCase {

    constructor() {
    }

    public async run(params: CreateThreadDTO , context: UserContext): Promise<any> {
        AssertContext(context , {isAuthenticated : true});

        await this.validateInput(params);

        const body = Utils.encodeHTML(params.body);
        const title = Utils.encodeHTML(params.title);
        // get user

        //create comment

    }

    private async validateInput(params: CreateThreadDTO): Promise<void> {
        const validation = validate(params, this.inputConstraints);
        if (!validation) {
            return;
        }
        throw new BaseError(validation, 400);
    }

    private inputConstraints = {
        title : {
            presence : true ,
            min : 20 ,
            max : 150
        },
        body : {
            presence : true ,
            min : 6 ,
            max : 500
        }
    }
}