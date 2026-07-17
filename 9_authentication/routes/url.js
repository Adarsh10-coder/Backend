const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytic} = require("../controllers/url")

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytic);

module.exports = router;