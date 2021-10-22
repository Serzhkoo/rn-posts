import * as SQLite from 'expo-sqlite';
import { PostType } from './store/actions/post-actions';

const db = SQLite.openDatabase('post.db');

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
          [],
          resolve,
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static getPosts() {
    return new Promise<PostType[]>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM posts',
          [],
          // @ts-ignore
          (_, result) => resolve(result.rows._array),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static createPost({text, date, booked, img}: PostType) {
    return new Promise<number>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)',
          [text, date, booked, img],
          (_, result) => resolve(result.insertId),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static updatePost(post: PostType) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE posts SET booked = ? WHERE id = ?',
          [post.booked ? 0 : 1, post.id],
          resolve,
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  static removePost(id: number) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM posts WHERE id = ?',
          [id],
          resolve,
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
}
