import { randomUUID } from "crypto";

import { IBlog } from "../../types";
import { DataStore } from "..";

export class db implements DataStore {
  private blogs: IBlog[];

  constructor() {
    this.blogs = [];
  }

  createBlog(blog: Omit<IBlog, "id">): void {
    this.blogs.push({
      id: randomUUID(),
      title: blog.title,
      content: blog.content,
    });
  }

  getBlogList(): IBlog[] {
    return this.blogs;
  }

  getBlogById(id: string): IBlog | undefined {
    return this.blogs.find((b) => b.id === id);
  }

  deleteBlog(id: string): void {
    const index = this.blogs.findIndex((b) => b.id === id);
    if (index >= 0) {
      this.blogs.splice(index, 1);
    }
  }
}
