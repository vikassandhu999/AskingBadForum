require("dotenv").config();
import mongoose from "mongoose";
import {    mongooseConnection
} from './connection';
import { Connection } from 'mongoose';

async function main() {
    const connection = await mongooseConnection(process.env.MONGO_URL_DEV as string);
    mongoose.connection.db.dropDatabase();
    console.log("Success");
    process.exit(0);
}

main().catch((error) => {
    console.log(error);
})