const User = require("../models/user");
const {v4: uuidv4} = require("uuid");
const {setUser} = require("../service/auth");

async function handleUserSignup(req, res) {
    const {name, email, password, Password} = req.body;
    const userData = {
        name,
        email,
        password: password || Password,
    };
    if(!userData.name || !userData.email || !userData.password) {
        return res.status(400).send("All fields are required.");
    }
    await User.create(userData);
    return res.redirect("/");
}
async function handleUserLogin(req, res) {
    const {email, password, Password} = req.body;
    const user = await User.findOne({
        email,
        password: password || Password,
    });
    if(!user) {
        return res.render("login", {
            error: "Invalid username or password",
        });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}