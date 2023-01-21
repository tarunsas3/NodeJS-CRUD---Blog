const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tarun2310#",
  database: "node_crud",
});

connection.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database Connected!");
});

//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // res.send('Blog Application using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM blog";
  let query = connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("blog_index", {
      title: "Blog Application using NodeJS / ExpressJS / MySQL",
      blog: rows,
    });
  });
});

app.get("/add", (req, res) => {
  res.render("post_add", {
    title: "Blog Application using NodeJS / ExpressJS / MySQL",
  });
});

app.post("/save", (req, res) => {
  let data = {
    title: req.body.title,
    post: req.body.post,
    keyword: req.body.keyword,
  };
  let sql = "INSERT INTO blog SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/edit/:postId", (req, res) => {
  const postId = req.params.postId;
  let sql = `Select * from blog where id = ${postId}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.render("post_edit", {
      title: "Blog Application using NodeJS / ExpressJS / MySQL",
      art: result[0],
    });
  });
});

app.post("/update", (req, res) => {
  const postId = req.body.id;
  let sql =
    "update blog SET title='" +
    req.body.title +
    "',  post='" +
    req.body.post +
    "',  keyword='" +
    req.body.keyword +
    "' where id =" +
    postId;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/delete/:postId", (req, res) => {
  const postId = req.params.postId;
  let sql = `DELETE from blog where id = ${postId}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Server Listening
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
