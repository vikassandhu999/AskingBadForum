import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {userRouter} from "../../../modules/user/infra/http/router";
import {handleExpressErrors} from "./utils";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

app.use("/v1" , userRouter);

app.use(handleExpressErrors);

export {
    app
}