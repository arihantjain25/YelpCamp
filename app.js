const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campgrounds = [
		{name: "Salmon Creek", image: "http://oregondiscovery.com/wp-content/uploads/2017/08/DSC00750.jpg"},
		{name: "Granite Hill", image: "https://a7807641ddbec626b320-8cf85e2b2ff02d1fa6d5834915d0924c.ssl.cf1.rackcdn.com/properties/photos/4847323_40_1531980660.jpg"},
		{name: "Mountain Goat's Rest", image: "https://c8.alamy.com/comp/CTWAG4/two-baby-mountain-goats-at-rest-on-the-tundra-CTWAG4.jpg"}
	]

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	

	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground)
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
})

app.listen(port, hostname, function() {
	console.log('The server has started at http://127.0.0.1:3000/ !');
});
