const { customAlphabet } = require("nanoid");
const URL = require("../models/url");

const generateShortID = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});
    const shortID = generateShortID();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.render("home", {
        id: shortID,
    })
    //return res.json({id: shortID});
}

async function handleGetAnalytic(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        Analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytic,
};