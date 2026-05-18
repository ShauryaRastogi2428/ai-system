const express = require("express");

const {

  addCandidate,

  getCandidates,

  saveCandidate,

  getSavedCandidates

} = require("../controllers/candidateController");

const router = express.Router();

router.post("/", addCandidate);

router.get("/", getCandidates);

router.put("/save/:id", saveCandidate);

router.get("/saved/all", getSavedCandidates);

module.exports = router;