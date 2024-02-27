import { IBlog } from "./types";

export type TCreateBlog = Omit<IBlog, "id">;

export type TGetBlogByIdRequest = { id: string };

export interface IGetBlogByIdResponse {
  blog: IBlog | undefined;
}

export interface TGetBlogList {
  blogs: IBlog[];
}

export type TDeleteBlog = { id: string };
