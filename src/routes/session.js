import { Router } from "express";

const router = Router();

router.get(`/`, (req, res) => {
  const { models, me } = req.context;
  return res.send(models.users[me.id]);
});

export default router;
