var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Blog_app",
 { useUnifiedTopology: true, useNewUrlParser: true })

 app.set("view engine","ejs")
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title: String,
    image:String,
    body:String,
    created:{type: Date, default:Date.now}
});
var Blog= mongoose.model("Blog",blogSchema);

app.get("/",function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", async function(req, res) {
    var blog = await Blog.find({});
    res.render("index", {blogs:blog});
}); 

app.get("/blogs/new",function(req,res){
    res.render("new");
});

app.post("/blogs", async function(req,res){
    var body = req.body.blog;
    var newBlog = await Blog.create(body);
    res.redirect("blogs");
});

app.get("/blogs/:id",async function(req,res){
    var foundBlog = await Blog.findById(req.params.id);
    res.render("show",{blog:foundBlog});       
});

app.get("/blogs/:id/edit",async function(req,res){
    var foundBlog = await Blog.findById(req.params.id);
    res.render("edit",{blog:foundBlog});  
});

app.put("/blogs/:id",async function(req,res){
        var body =req.body.blog;
        var updatedBlog = await Blog.findByIdAndUpdate(req.params.id,(body));
        res.redirect("/blogs/"+ req.params.id);
    });

app.delete("/blogs/:id",async function(req,res){
    var updatedBlog = await Blog.findByIdAndRemove(req.params.id);
    res.redirect("/blogs");
});

 app.listen(3001,function(){
    console.log("The server started");
});