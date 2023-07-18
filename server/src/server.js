require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
const db = require('./app/config/db');
const route = require('./app/routes');
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);
app.listen(9000, () => {
    console.log('server start ');
});
