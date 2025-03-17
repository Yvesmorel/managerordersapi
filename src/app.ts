const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mdbConnect = require("./config/db");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')

dotenv.config();

mdbConnect();

app.use(bodyParser.json());
app.use(cookieParser())
require("./server")(app);
