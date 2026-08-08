import "reflect-metadata";

import { DataSource } from "typeorm";

import dotenv from "dotenv";

dotenv.config();

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
});

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  synchronize: true,

  logging: true,

  entities: ["src/entities/*.ts"],
});
