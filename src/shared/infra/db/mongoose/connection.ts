import mongoose from "mongoose";

async function mongooseConnection(url: string) {
    try {
        return await mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
    } catch (e) {
        console.log("[Mongoose Error] : Unable to connect", e.message);
        throw e;
    }
}

export {
    mongooseConnection
}