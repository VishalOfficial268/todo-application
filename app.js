const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/auth');
// const PORT = process.env.PORT || 3000;
const PORT = 3000;

const todoRouter = require('./routes/todo');

// env config:
dotenv.config();

//db config and setup:
require('./config/db-config');


//for log in the console:
app.use(morgan('dev'));

//middleware:
app.use(express.json())
app.use(cors());


//routes middleware:
app.use('/api/user', authRouter);
app.use('/api/todo', todoRouter);


//default landing page as home page:
app.get('/', (req, res) => {
    res.send("A Rest API which has  JWT authentications, to create todo app.");
})

// middleware handling:
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send(error);
})


//server listning:
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})