var mongoose = require("mongoose"),
    campground = require("./models/campgrounds"),
    comment = require("./model/comment"),
    data = [
        {
            name: "Cloud's Rest",
            image: "https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c7d2f78dd924ac750_340.jpg",
            description: "Blah Blah Blah Blah"
        },
        {
            name: "Desert Mesa",
            image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2f78dd924ac750_340.jpg",
            description: "Blah Blah Blah Blah"
        },
        {
            name: "Canyon Floor",
            image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f78dd924ac750_340.jpg",
            description: "Blah Blah Blah Blah"
        }
    ];

function seedDB() {
    campground.remove({}, function(err) {
        if(err) console.log(err);
        else {
            data.forEach(function(seed) {
                campground.create(seed, function(err, campground) {
                    if(err) console.log(err);
                    else {
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Home"
                            }, function(err, comment) {
                                if(err) console.log(err);
                                else {
                                    campground.comments.push(comment);
                                    campground.save();
                                }
                            }
                        )
                    }
            });
        }
    });
}

module.exports = seedDB;