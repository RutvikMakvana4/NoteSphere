import "dotenv/config";
import express from "express";
import path from "path";
import dbConnection from "./src/common/config/dbConnection";

const app = express();

const PORT = process.env.PORT || 8005;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(path.join(__dirname + "/public")))  // Static path to show image in crome

app.listen(PORT, (err) => {
  if (err) throw new console.log("Server not connect");
  console.log(`Server is running on http://${process.env.HOST}:${PORT}`);
});