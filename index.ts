import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";

import { BlogHandler } from "./handlers/blogHandler";
import { db } from "./datastore/sql/index";

config();
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const DB = new db();
const BH = new BlogHandler(DB);

const PORT = process.env.PORT || 8080;

app.get("/blogs", BH.blogList);
app.post("/blog", BH.createBlog);
app.get("/blog/:id", BH.getBlogById);
app.delete("/blog/:id", BH.delete);

app.listen(PORT, () => {
  console.log(`app is running in http://localhost:${PORT}`);
});
