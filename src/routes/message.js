import uuidv4 from "uuid/v4";
import { Router } from "express";

const router = Router();

router.get(`/`, (req, res) => {
  const { messages } = req.context.models;
  return res.send(Object.values(messages));
});

router.get(`/:messageId`, (req, res) => {
  const { messageId } = req.params;
  return res.send(messages[messageId]);
});

router.post(`/`, (req, res) => {
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

router.delete(`/:messageId`, (req, res) => {
  const { messageId } = req.params;
  let { messages } = req.context.models;
  const { [messageId]: message, ...otherMessages } = messages;
  messages = otherMessages;
  return res.send(message);
});

export default router;
