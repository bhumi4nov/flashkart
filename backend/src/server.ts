import "reflect-metadata";
import "./redis/redis";
import app from "./app";
import { AppDataSource } from "./config/database";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()

  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server Started ${PORT}`);
    });
  })

  .catch((err) => {
    console.error("Database Connection Failed");
    console.error(err);
  });
