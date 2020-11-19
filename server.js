require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./app/config/db.config");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(dbConfig.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
     return console.log("Successfully connect to MongoDB.");
})
    .catch(err => {
        console.error(err.message);
        process.exit();
    });

mongoose.set('useCreateIndex', true);

const PORT = process.env.NODE_ENV_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get("/", async (req, res) => {
    res.json({message: "Welcome to smartzi node application"});
});

require("./app/routes/auth.routes")(app);
require("./app/routes/store.routes")(app);





