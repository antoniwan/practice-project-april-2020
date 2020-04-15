import { Router } from "express";

const router = Router();

router.get(`/`, async (req, res) => {
  const { models, me } = req.context;
  const user = await models.User.findById(me.id);
  return res.send(user);
});

router.get(`/:userId`, async (req, res) => {
  const { userId } = req.params;
  const { models } = req.context;
  const user = await models.User.findById(userId);
  return res.send(user);
});

export default router;
