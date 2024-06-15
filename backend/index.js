import "dotenv/config";
import express from "express";
import path from "path";
import "./src/common/config/dbConnection";
import mainRouter from "./routers/index";
import swaggerSetup from "./src/common/swagger";
import session from "express-session";
import { JWT } from "./src/common/constants/constants";
import "./src/common/config/jwtPassport";

const app = express();

const PORT = process.env.PORT || 8005;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    name: "LEAVE APP",
    secret: JWT.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(mainRouter);
app.use(swaggerSetup);

app.use(express.static(path.join(__dirname + "/public"))); // Static path to show image in crome
app.use(require("./src/common/middleware/error"));

app.listen(PORT, (err) => {
  if (err) throw new console.log("Server not connect");
  console.log(`Server is running on http://${process.env.HOST}:${PORT}`);
});
