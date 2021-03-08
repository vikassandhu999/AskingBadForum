import {IUserRepository} from "../../repositories/IUserRepository";
import {UserContext} from "../../domain/UserContext";
import {GetUserProfileResponse, ProfileNotFoundError} from "./types";
import _ from "lodash";
import {AssertContext} from "../../../../shared/core/AssertContext";
import {assert} from "../../../../shared/core/Assert";
import {UseCase} from "../../../../shared/core/Usecase";

export class GetUserProfileUseCase extends UseCase<{} , GetUserProfileResponse> {
    private readonly userRepository : IUserRepository;

    constructor(userRepository : IUserRepository) {
        super(false);
        this.userRepository = userRepository;
    }

    protected inputConstraints: any;

    public async runImpl(params: {} , context: UserContext): Promise<GetUserProfileResponse> {
        AssertContext(context,  {isAuthenticated : true});

        const userId = context.userId;

        const user = await this.userRepository.getById(userId);

        assert(!!user, new ProfileNotFoundError());

        // @ts-ignore
        const dtoUser = user.toDTO();

        return new GetUserProfileResponse( _.omit(dtoUser , ["authSecret" , "password" , "isDeleted" , "isEmailVerified"]));
    }

}