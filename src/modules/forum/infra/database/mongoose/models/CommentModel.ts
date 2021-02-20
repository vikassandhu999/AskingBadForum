import { Schema , model , SchemaTypes} from "mongoose";

const { String , Date, Boolean } = SchemaTypes;

const schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
};

/*
    Queries : by thread_id and reply_to , by thread_id , by user_id , by user_name
 */

//add timestamps
const commentSchema = new Schema({
    comment_id : {required : true , unique : true , type : String},
    user_id: { required : true, type : String },
    user_name: { required : true, type : String },
    thread_id:{ required : true, type : String},
    reply_to: { required : true, type : String },
    body: { required : true, type : String }
} , schemaOptions);

commentSchema.index("comment_id" , {unique : true});
commentSchema.index( {"thread_id" : 1 , "reply_to" : 1});
commentSchema.index("user_id");
commentSchema.index("user_name");

const CommentModel = model("comment" , commentSchema);

export {
    CommentModel
}