let express = require("express");
let router = express.Router();

//GET Ping API
router.get('/ping', (req, res) => {
  res.send({success: true}, 200);
});

//GET Posts filtered by tags,
router.get('/posts', (req, res) => {
  res.send({success: true}, 200);
});

module.exports = router;
