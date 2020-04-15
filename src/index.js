import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { connectDb } from "./models";
import routes from "./routes";

const PORT = process.env.PORT || 3000;
const app = express();
const eraseDatabaseOnSync = true;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use(`/`, routes.homepage);
app.use(`/session`, routes.session);
app.use(`/users`, routes.user);
app.use(`/messages`, routes.message);

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
    ]);
  }

  app.listen(PORT, () =>
    console.log(`Example Node.js API app listening on port ${PORT}`)
  );
});
