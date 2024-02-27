import {
  IGetBlogByIdResponse,
  TCreateBlog,
  TDeleteBlog,
  TGetBlogByIdRequest,
  TGetBlogList,
} from "../api";
import { DataStore } from "../datastore";
import { ExpressHandler, ExpressHandlerWithParams } from "../types";

export class BlogHandler {
  private db: DataStore;
  constructor(db: DataStore) {
    this.db = db;
  }

  blogList: ExpressHandler<{}, TGetBlogList> = (_, res) => {
    return res.status(201).send({ blogs: this.db.getBlogList() });
  };

  createBlog: ExpressHandler<TCreateBlog, {}> = (req, res) => {
    const { title, content } = req.body;

    console.log(req.body);

    if (!title) {
      return res.send({ error: "blog title are requrie" });
    }

    if (!title || !content) {
      return res.send({ error: "blog content are requrie" });
    }

    this.db.createBlog({ title, content });

    return res.sendStatus(201);
  };

  delete: ExpressHandlerWithParams<TDeleteBlog, {}, {}> = (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(403).send({ error: "id is requrie" });
    }
    this.db.deleteBlog(id);
    return res.sendStatus(200);
  };

  getBlogById: ExpressHandlerWithParams<
    TGetBlogByIdRequest,
    {},
    IGetBlogByIdResponse
  > = (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(403).send({ error: "id is requrie" });
    }
    return res.status(200).send({ blog: this.db.getBlogById(id) });
  };
}
