import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
var cors = require("cors");
var cookieParser = require("cookie-parser");
import { currentUser, errorHandler } from "@bscommon/common";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(errorHandler);

export { app };