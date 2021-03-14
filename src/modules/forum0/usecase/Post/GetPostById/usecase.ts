import { UseCase } from "../../../../../shared/core/Usecase";
import {GetPostByIdDTO, GetPostByIdResponse} from "./types";
import {PostDTO} from "../../../domain/Post";

export class GetPostByIdUseCase extends UseCase<GetPostByIdDTO,GetPostByIdResponse> {

    constructor() {
        super();
    }

    inputConstraints: any = {

    };

    protected async runImpl(params: GetPostByIdDTO, context: any): Promise<GetPostByIdResponse> {
        return new GetPostByIdResponse({} as PostDTO);
    }

}