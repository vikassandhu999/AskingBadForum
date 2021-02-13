require("dotenv").config()

import {mongooseConnection} from "./shared/infra/db/mongoose/connection";

const mongoUrl = process.env.MONGO_URL_DEV as string;

async function main() {
    await mongooseConnection(mongoUrl);
}

main().then(r => console.log("Service has been started successfully"));