const mongoose = require('mongoose');
const localDbUrl = "mongodb://127.0.0.1:27017/todoDb";

mongoose.connect(localDbUrl).then(() => {
    console.log("db connected...")
}).catch(console.log);