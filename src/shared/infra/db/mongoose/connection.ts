import mongoose from "mongoose";

async function mongooseConnection(url: string) {
    try {
        if(process.env.NODE_ENV!="production")
            mongoose.set("debug" , true);
        return await mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
    } catch (e) {
        console.log("[Mongoose Error] : Unable to connect", e.message);
        throw e;
    }
}

export {
    mongooseConnection
}