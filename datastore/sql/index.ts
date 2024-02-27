// import { Database, open as sqliteOpen } from "sqlite";
// import sqlite3 from "sqlite3";
import { randomUUID } from "crypto";

import { IBlog } from "../../types";
import { DataStore } from "..";

export class db implements DataStore {
  private blogs: IBlog[];
  // private db!: Database<sqlite3.Database, sqlite3.Statement>;

  constructor() {
    this.blogs = [];
  }

  // public async openDb(dbPath: string) {
  //   this.db = await sqliteOpen({
  //     filename: dbPath,
  //     driver: sqlite3.Database,
  //     mode: sqlite3.OPEN_READWRITE,
  //   });
  // }

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
