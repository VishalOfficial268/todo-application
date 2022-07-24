const express = require('express');
const app = express();
const PORT = 3000;
require('./config/db-config');


app.get('/', (req, res) => {
    res.send("A Rest API which has  JWT authentications, to create todo app.");
})


app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})