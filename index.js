var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose")
    bodyParser  = require("body-parser");


    mongoose.set("debug", true);

    mongoose.set('useNewUrlParser',    true);
    mongoose.set('useFindAndModify',   false);
    mongoose.set('useCreateIndex',     true);
    mongoose.set('useUnifiedTopology', true);

 mongoose.connect("mongodb://localhost/single_page_app");
   

var todoRoutes = require("./controller/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get ("/", function(req, res){
  res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);








var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started!");
});    