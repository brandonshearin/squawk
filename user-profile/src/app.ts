import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@bscommon/common";

import { newRouter } from "./routes/new";
import { showRouter } from "./routes/show";
import { indexRouter } from "./routes";
import { deleteRouter } from "./routes/delete";
import { updateRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(newRouter);
app.use(showRouter);
app.use(indexRouter);
app.use(deleteRouter);
app.use(updateRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
