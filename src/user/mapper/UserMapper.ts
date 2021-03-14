import {User} from "../domain/User";

export class UserMapper {
    public static toDomain(userModel: any): User {
        return new User({
            userId: userModel.user_id,
            userName: userModel.user_name,
            fullName: userModel.full_name,
            email: userModel.email,
            password: userModel.password,
            isEmailVerified: userModel.is_email_verified,
            isDeleted: userModel.is_deleted,
            createdAt: userModel.created_at,
            authSecret: userModel.auth_secret
        });
    }

    public static toPersistence(user: User): any {
        return {
            user_id: user.userId,
            user_name: user.userName,
            full_name: user.fullName,
            email: user.email,
            password: user.password,
            is_email_verified: user.isEmailVerified,
            is_deleted: user.isDeleted,
            created_at: user.createdAt,
            auth_secret: user.authSecret
        }
    }
}