const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB is connected'))
  .catch(err => console.error(err));

const articleSchema = {
    title: String,
    content: String
}
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(function(req, res) {
    Article.find()
      .then(function(foundArticles) {
        res.send(foundArticles);
      })
      
  })
.post(function(req, res) {
const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
});
newArticle.save()
.then(function() {
    res.send("Successfully Added a new artcile");
    })
    .catch(function(err) {
    console.error(err);
    });
})
.delete(function(req, res){
    Article.deleteMany()
    .then(function(){
        res.send("Successfully deleted all the articles");
    })
    .catch(function(err) {
        console.error(err);
      });
});

app.get("/articles", );
 
app.post("/articles", );

app.delete("/articles", );

app.route("/articles/:articleTitle")
  .get(function(req, res) {
    Article.find({ title: req.params.articleTitle })
      .then(function(foundArticles) {
        res.send(foundArticles);
      })
      .catch(function(err) {
        console.error(err);
      });
  })
  .put(function(req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: { title: req.body.title, content: req.body.content } }
    )
      .then(function() {
        res.send("Successfully updated article.");
      })
      .catch(function(err) {
        console.error(err);
      });
  })
  .patch(function(req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body }
    )
      .then(function() {
        res.send("Successfully updated article.");
      })
      .catch(function(err) {
        console.error(err);
      });
  })
  .delete(function(req, res){
    Article.deleteOne({ title: req.params.articleTitle })
    .then(function(){
        res.send("Successfully deleted all the articles");
    })
    .catch(function(err) {
        console.error(err);
      });
  });

app.get("/articles/jackbauer", );
app.listen(3000, function(){
    console.log("server started on port 3000");
});