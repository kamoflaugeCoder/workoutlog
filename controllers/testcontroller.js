const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const TestModel = sequelize.import('../models/test'); //1



router.get('/', function(req, res) {
    res.send('Hey!!! This is a test route!');
});

//1              //2
router.post('/one', function(req, res) {
    //3
    res.send("Test 1 went through!")
});

router.post('/one', function(req, res) {
    res.send("Got a post request.")
});

router.post('/two', function(req, res) {
    let testData = "Test data for endpoint two"; //2

    TestModel //3
        .create({ //4
        //6
        testdata: testData //5
    }).then(dataFromDatabase => {
        res.send("Test two went through!")
    })
});





module.exports = router;