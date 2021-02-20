import { Schema , model , SchemaTypes} from "mongoose";

const { String , Date, Boolean } = SchemaTypes;

const schemaOptions = {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
};

/*
    Queries : by thread_id , by user_id, or by_username
 */

//add timestamps
const threadSchema = new Schema({
    thread_id:{ required : true, unique : true, type : String},
    user_id: { required : true, type : String },
    user_name: { required : true, type : String },
    title : {required : true , type : String},
    body: { required : true, type : String }
    } , schemaOptions);

threadSchema.index("user_id");
threadSchema.index("user_name");
threadSchema.index("thread_id");

const ThreadModel = model("thread" , threadSchema);

export {
    ThreadModel
}