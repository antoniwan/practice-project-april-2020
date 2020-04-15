import { Router } from "express";

const router = Router();

router.get(`/`, async (req, res) => {
  const { models } = req.context;
  const messages = await models.Message.find();
  return res.send(messages);
});

router.get(`/:messageId`, async (req, res) => {
  const { messageId } = req.params;
  const { models } = req.context;
  const message = await models.Message.findById(messageId);
  return res.send(message);
});

router.post(`/`, async (req, res) => {
  const { models, me } = req.context;
  const message = await models.Message.create({
    text: req.body.text,
    user: me.id,
  });
  return res.send(message);
});

router.delete(`/:messageId`, async (req, res) => {
  const { messageId } = req.params;
  const { models } = req.context;
  const message = await models.Message.findById(messageId);

  let result = null;
  if (message) {
    result = await message.remove();
  }
  return res.send(result);
});

export default router;
