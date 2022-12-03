require("dotenv").config();
import appRootPath from "app-root-path";
import express from "express";
import connectDB from "src/config/db";
import errorHandler from "src/middleware/common/error-handler";
import { mainRouter } from "src/routes";

import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(appRootPath.path + "/public"));

app.use("/api/v1", mainRouter);

app.use(errorHandler);
// logger.log("Hello", "hello World");
// logger.error({
//   level: "error",
//   message: "Hello error",
// });

// logger.info({
//   level: "info",
//   message: "Hello info",
// });

// logger.warn({
//   level: "warn",
//   message: "Hello warn",
// });

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
