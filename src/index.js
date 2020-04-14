import "dotenv/config";
import cors from "cors";
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
