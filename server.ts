require("dotenv").config();
import appRootPath from "app-root-path";
import express from "express";
import connectDB from "src/config/db";
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
      version: "1.0.0",
      servsers: ["http://localhost:3000"],
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
    },
  },
  apis: ["**/*.ts"],
};

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
      servsers: ["http://localhost:3000"],
      version: "1.0",
    },
  },
  apis: ["./index.ts"],
};

const swaggerUiOption: SwaggerUI.SwaggerUiOptions = {
  explorer: true,
};
const swaggerDocs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  SwaggerUI.serve,
  SwaggerUI.setup(swaggerDocs, swaggerUiOption)
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(appRootPath.path + "/public"));

app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
