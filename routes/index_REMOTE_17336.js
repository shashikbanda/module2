var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next){
	res.render("home")//MAIN PAGE EJS FILE GOES HERE
})

module.exports = router;
