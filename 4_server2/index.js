const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello from Home Page");
});
app.get("/about", (req, res) => {
    return res.send(`Hello ${req.query.name}`);
});

app.listen(9000, () => console.log("Server started!"));

// const myServer = http.createServer(app);

// myServer.listen(9000, () => console.log("Server started!"));