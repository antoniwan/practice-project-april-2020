import { Router } from "express";

const router = Router();

router.get(`/`, (req, res) => {
  const { models } = req.context;
  return res.send(Object.values(models.users));
});

router.get(`/:userId`, (req, res) => {
  const { userId } = req.params;
  const { users } = req.context.models;
  return res.send(users[userId]);
});

export default router;
