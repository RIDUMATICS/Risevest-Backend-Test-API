import {
  randEmail,
  randFullName,
  randPassword,
  randSentence,
  randText,
  randTextRange,
} from "@ngneat/falso";
import { DataSource } from "typeorm";
import { Post, User, Comment } from "../src/models";
import DBConnection from "../src/database/connection";

export class TestHelper {
  private dbConnect: DataSource;
  private static _instance: TestHelper;

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  setupTest() {
    beforeAll(async () => {
      await this.startTestDB();
    });

    afterAll(async () => {
      await this.closeTestDB();
    });
  }

  async startTestDB() {
    this.dbConnect = await DBConnection.initialize();
  }

  async closeTestDB() {
    const entities = this.dbConnect.entityMetadatas;
    for await (const entity of entities) {
      const repository = this.dbConnect.getRepository(entity.name);

      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
      );
    }
    await this.dbConnect.destroy();
  }

  generateUserData(override = {}): Partial<User> {
    return {
      name: randFullName({ withAccents: false }),
      email: randEmail({}),
      password: randPassword({ size: 8 }),
      ...override,
    };
  }

  generatePostData(override = {}): Partial<Post> {
    return {
      title: randTextRange({ min: 10, max: 150 }),
      body: randSentence(),
      ...override,
    };
  }

  generateCommentData(override = {}): Partial<Comment> {
    return {
      content: randSentence(),
      ...override,
    };
  }
}
