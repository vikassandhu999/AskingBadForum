import { Schema , model , SchemaTypes} from "mongoose";

const { String , Date, Boolean} = SchemaTypes;

const userSchema = new Schema({
    user_id: { required : true, unique : true, type : String },
    user_name: { required : true, unique : true, type : String },
    full_name:{ required : true, type : String},
    email: { required : true, unique : true, type : String },
    password: { required : true, type : String },
    is_email_verified: { required : true, default : false, type : Boolean },
    is_deleted:  { required : true, default : false, type : Boolean },
    created_at:  { required : true, type : Date },
    auth_secret:  { type : String },
});

userSchema.index("user_id");
userSchema.index("user_name");
userSchema.index("email");

const UserModel = model("user" , userSchema);
export {
    UserModel
}