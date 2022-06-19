require("dotenv").config();
import appRootPath from "app-root-path";
import express from "express";
import connectDB from "src/config/db";
import { mainRouter } from "src/routes";

const app = express();

const port = 3000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(appRootPath.path + "/public"));

app.use(mainRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
