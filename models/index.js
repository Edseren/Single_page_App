var mongoose    = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/single_page_app");

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");