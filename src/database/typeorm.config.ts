import { DataSourceOptions } from "typeorm";
import config from "../config/index";

let dataSource: DataSourceOptions = {
  type: "postgres",
  url: config.db.url,
  logging: config.db.logging,
  entities: [__dirname + "/../**/*.model.{js,ts}"],
  migrations: ["./dist/database/migrations/*.js"],
  synchronize: true,
};

if (config.NODE_ENV === "production") {
  dataSource = {
    ...dataSource,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
}

export default dataSource;
