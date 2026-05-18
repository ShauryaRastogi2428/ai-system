const express = require("express");

const {
  aiShortlist
} = require("../controllers/aiController");

const router = express.Router();

router.post("/shortlist", aiShortlist);

module.exports = router;