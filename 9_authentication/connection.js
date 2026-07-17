const mongoose = require("mongoose");


// Connnection
async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB,
};