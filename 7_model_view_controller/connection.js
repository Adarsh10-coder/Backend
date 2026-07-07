const mongoose = require("mongoose");


// Connnection
async function connectMongoDb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDb,
};