let express = require("express");
let router = express.Router();

//GET Posts filtered by tags,
router.get('/', (req, res) => {
  res.status(200);
});

module.exports = router;
