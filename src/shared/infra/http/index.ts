import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import {userRouter} from "../../../modules/user/infra/http/router";
import {handleExpressErrors} from "./utils";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

if(process.env.ENV!="production") {
    app.use(morgan("dev"));
}

app.use("/v1" , userRouter);

app.use(handleExpressErrors);

export {
    app
}