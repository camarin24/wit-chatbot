import express from "express";
import { Bot } from "./app";
const app = express();
const bot = new Bot();

app.get("/", function(req, res) {
  bot
    .init({
      message: "hola como estas?"
    })
    .then(data => {
      res.json(data);
    });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
