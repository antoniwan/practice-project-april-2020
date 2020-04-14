import "dotenv/config";
import express from "express";

console.log("Hello node.js project!");
console.log(process.env.MY_SECRET);

const API_PORT = process.env.API_PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.listen(API_PORT, () => {
  console.log(`Example app listening on port ${API_PORT}`);
});
