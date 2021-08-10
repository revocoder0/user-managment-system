const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
//require('dotenv').config();
dotenv.config();
const path = require('path');

const app = express();
const port = process.env.PORT ||5000;

//Parsing Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static File
app.use(express.static('public'));

//Templating Engine
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit :100,
    host            : process.env.DATABASE_HOST,
    user            : process.env.DATABASE_USER,
    password        : process.env.DATABASE_PASSWORD,
    database        : process.env.DATABASE_NAME
});

pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' +connection.threadId);
});


const routes= require('./server/routes/user.js');
app.use('/', routes);

app.listen(port, ()=>console.log(`listening on port ${port}...`));