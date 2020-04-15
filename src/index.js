import "dotenv/config";
import cors from "cors";
import express from "express";
import uuidv4 from "uuid/v4";
import models from "./models";

const PORT = process.env.PORT || 3000;
const app = express();
const { users, messages } = models;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    me: users[1],
  };
  next();
});

app.get(`/`, (req, res) => {
  return res.send(`Received a GET HTTP method`);
});

app.post(`/`, (req, res) => {
  return res.send(`Received a POST HTTP method`);
});

app.put(`/`, (req, res) => {
  return res.send(`Received a PUT HTTP method`);
});

app.delete(`/`, (req, res) => {
  return res.send(`Received a DELETE HTTP method`);
});

app.get(`/users`, (req, res) => {
  const { models } = req.context;
  return res.send(Object.values(models.users));
});

app.get(`/users/:userId`, (req, res) => {
  const { userId } = req.params;
  const { users } = req.context.models;
  return res.send(users[userId]);
});

app.post(`/users`, (req, res) => {
  return res.send(`POST HTTP method on user resource`);
});

app.put(`/users/:userId`, (req, res) => {
  const { userId } = req.params;
  return res.send(`PUT HTTP method on user/${userId} resource`);
});

app.delete(`/users/:userId`, (req, res) => {
  const { userId } = req.params;
  return res.send(`DELETE HTTP method on user/${userId} resource`);
});

app.get(`/messages`, (req, res) => {
  const { messages } = req.context.models;
  return res.send(Object.values(messages));
});

app.post(`/messages`, (req, res) => {
  const id = uuidv4();
  const { models, me } = req.context;
  const { messages } = models;
  const message = {
    id,
    text: req.body.text,
    userId: me.id,
  };

  messages[id] = message;

  return res.send(message);
});

app.get(`/messages/:messageId`, (req, res) => {
  const { messageId } = req.params;
  return res.send(messages[messageId]);
});

app.delete("/messages/:messageId", (req, res) => {
  const { messageId } = req.params;
  let { messages } = req.context.models;
  const { [messageId]: message, ...otherMessages } = messages;
  messages = otherMessages;
  return res.send(message);
});

app.get(`/session`, (req, res) => {
  const { models, me } = req.context;
  return res.send(models.users[me.id]);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
