const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);



app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	//Get campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds:allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	// Create new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
	// res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
})

app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
})

app.listen(port, hostname, function() {
	console.log('The server has started at http://127.0.0.1:3000/ !');
});
