import {app} from "./shared/infra/http";

require("dotenv").config()

import {mongooseConnection} from "./shared/infra/db/mongoose/connection";

const mongoUrl = process.env.MONGO_URL_DEV as string;
const port = process.env.PORT;

async function main() {
    await mongooseConnection(mongoUrl);
    app.listen(port);
}

main().then(r => console.log("Service has been started successfully"));