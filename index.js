const express = require('express');

const cookieSession = require('cookie-session');
const passport = require('passport');

const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');

require('./services/passport');
const authRoutes = require('./routes/authRoutes');  //section 4-28

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge:30 * 24 * 60 *1000,
        keys:[keys.cookieKey]
    })
);

app.use(passport.initialize()); //tell passport that we use cookie
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);