const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mdbConnect = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const headerParser = require("header-parser");

dotenv.config();

mdbConnect();

app.use(cors()).use(headerParser).use(bodyParser.json()).use(cookieParser());

require("./server")(app);
