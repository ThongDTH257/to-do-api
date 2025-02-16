import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [Task],
});

export const AppDataSourceTest = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [Task],
  dropSchema: true
});
