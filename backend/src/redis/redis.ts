import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (error) => {
  console.log("Redis Error:", error);
});

export default redis;
