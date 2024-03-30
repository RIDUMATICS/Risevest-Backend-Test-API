import { DataSource } from "typeorm";
import dataSourceConfig from "./typeorm.config";

const connectDB = new DataSource(dataSourceConfig);

export default connectDB;
