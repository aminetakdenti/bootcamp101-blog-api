import { RequestHandler } from "express";

export interface IBlog {
  id: string;
  title: string;
  content: string;
}

export interface BlogDao {
  createBlog(blog: Omit<IBlog, "id">): void;
  getBlogList(): IBlog[];
  getBlogById(id: string): IBlog | undefined;
  deleteBlog(id: string): void;
}

type WithError<T> = T & { error: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
