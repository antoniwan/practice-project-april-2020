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

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("antoniwan"),
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

    seedDB();
  }

  app.listen(PORT, () =>
    console.log(`Example Node.js API app listening on port ${PORT}`)
  );
});

const seedDB = async () => createUsersWithMessages();

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: "antoniwan",
  });

  const user2 = new models.User({
    username: "moni",
  });

  const message1 = new models.Message({
    text: "Some text goes here. Hi hi hi, ho ho ho.",
    user: user2.id,
  });

  const message2 = new models.Message({
    text: "Another string of text goes here...",
    user: user2.id,
  });

  const message3 = new models.Message({
    text: "This tutorial by rwieruch is sooooo good!",
    user: user1.id,
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};
