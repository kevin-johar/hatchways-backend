import express from 'express';
let router = express.Router();

//GET Ping API
router.get('/ping', (req, res) => {
  res.status(200).send({success: true});
});

//GET Posts filtered by tags,
router.get('/posts', (req, res) => {
  res.status(200).send({success: true});
});

export default router;
