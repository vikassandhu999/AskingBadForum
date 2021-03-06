import { Schema , model , SchemaTypes} from "mongoose";

const { String , Date, Boolean } = SchemaTypes;

const schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
};

/*

    Queries : by thread_id , by user_id, or by_username
 */

//add timestamps
const postSchema = new Schema({
    post_id:{ required : true, unique : true, type : String},
    user_id: { required : true, type : String },
    user_name: { required : true, type : String },
    title : {required : true , type : String},
    body: { required : true, type : String }
    } , schemaOptions);

postSchema.index("user_id");
postSchema.index("user_name");
postSchema.index("post_id");

const PostModel = model("post" , postSchema);

export {
    PostModel
}