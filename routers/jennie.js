const express = require('express');
const jennie = express.Router();

jennie.get('/', function(req, res) {
    res.send("Jennie");
});

jennie.get('/test', function(req, res){
    res.send("Test");
})

module.exports = jennie;