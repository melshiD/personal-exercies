const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');

app.use("/", shelterRoutes);

app.listen(3000, () => {
    console.log('connection on localhost:3000')
});

//WHEN YOU SIT BACK DOWN YOU'LL HAVE TO DEBUG THIS DAMN MIDDLEWARE ERROR