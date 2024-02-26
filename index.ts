import express from "express";

const app = express();

app.get("/", (_, res) => {
  return res.send("hi yooo!");
});

app.listen(3000, () => {
  console.log("app is runinng in http://localhost:3000");
});
