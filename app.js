var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    campground  = require("./models/campgrounds"),
    seedDB      = require("./seeds");

seedDB();

app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true } );

var campgrounds = [
    {name: "Manali", image: "https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-near-Mumbai-.jpg"},
    {name: "Manali", image: "https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-near-Mumbai-.jpg"},
    {name: "Manali", image: "https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-near-Mumbai-.jpg"},
    {name: "Manali", image: "https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-near-Mumbai-.jpg"},
    {name: "Manali", image: "https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-near-Mumbai-.jpg"},
    {name: "Manali", image: "https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-near-Mumbai-.jpg"}
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    campground.find({}, function(err, campgrounds) {
        if(err) console.log(err);
        else res.render("index", {campgrounds: campgrounds});
    })
});

app.post("/campgrounds", function(req, res) {
    campground.create({name: req.body.name, image: req.body.image, description: req.body.desc}, function(err, newlycreated) {
        if(err) console.log(err);
        else res.redirect("/campgrounds");
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    campground.findById(req.params.id, function(err, foundcampground) {
        if(err) console.log(err);
        else res.render("show", {campground: foundcampground});
    });
})

app.listen(3000, function() {
    console.log("server started!");
});