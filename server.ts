require("dotenv").config();
import appRootPath from "app-root-path";
import express from "express";
import connectDB from "src/config/db";
import errorHandler from "src/middleware/error-handler";
import { mainRouter } from "src/routes";

import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";

const app = express();

const port = process.env.PORT || 3000;
connectDB();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "0.1.0",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
    },
    servsers: [
      {
        url: `http://localhost:${port}`,
        description: "Localhost server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(options);
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(appRootPath.path + "/public"));

// const router = Router();

// app.use(
//   "/api/v1/user",
//   router.get("/profile", (req, res, next) => {
//     console.log("req.path: ", req.path);
//     console.log("req.url: ", req.url);
//     console.log("req.baseUrl: ", req.baseUrl);
//     console.log("req.originalUrl: ", req.originalUrl);
//     next();
//   })
// );

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
  console.log(`Example app listening at http://localhost:${port}`);
});
