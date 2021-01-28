require('dotenv').config();

let express = require('express');
const app = express();
const sequelize = require('./db');

app.use(express.json());
app.use(require('./middleware/headers'));

sequelize.sync(); //tip: pass in{force: true} for resetting tables

const user = require('./controllers/usercontroller');
const workoutlog = require('./controllers/workoutlogcontroller');

app.use('/user', user);

// app.use(require('./middleware/validate-session'));
app.use('/workoutlog', workoutlog);


app.listen(3000, function() {
    console.log('Connected on localhost 3000.');
});