import {IUserRepository} from "../../repositories/IUserRepository";
import {UserContext} from "../../domain/UserContext";
import {GetUserProfileResponse, ProfileNotFoundError} from "./types";
import _ from "lodash";
import {AssertContext} from "../../../../shared/core/AssertContext";

export class GetUserProfileUseCase {
    private readonly userRepository : IUserRepository;

    constructor(userRepository : IUserRepository) {
        this.userRepository = userRepository;
    }

    public async run(params: {} , context: UserContext): Promise<GetUserProfileResponse> {
        AssertContext(context,  {isAuthenticated : true});

        const userId = context.userId;

        const user = await this.userRepository.getById(userId);

        if(!user) throw new ProfileNotFoundError();

        const dtoUser = user.toDTO();

        return new GetUserProfileResponse( _.omit(dtoUser , ["authSecret" , "password" , "isDeleted" , "isEmailVerified"]));
    }

}