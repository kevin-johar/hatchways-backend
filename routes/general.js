let express = require("express");
let router = express.Router();

//GET Ping API
router.get('/ping', (req, res) => {
  res.status(200);
});

module.exports = router;
