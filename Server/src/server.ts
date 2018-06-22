import express from "express";
import { Bot } from "./app";
const app = express();
const bot = new Bot();

app.get("/", function(req, res) {
  console.log(req.query.message);
  bot
    .init({
      message: req.query.message
    })
    .then(data => {
      res.json(data);
    });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
