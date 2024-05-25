import Redis from "ioredis";

declare global {
  var redis: any;
}
const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
const port = parseInt(process.env.REDIS_PORT || "10772");

if (!password || !host)
  throw new Error("REDIS_PASSWORD or REDIS_HOST is not defined");

let cached = global.redis;

if (!cached) {
  cached = global.redis = {
    client: new Redis({
      password,
      host,
      port,
      maxRetriesPerRequest: 10,
      connectTimeout: 10000,
    }),
    promise: null,
  };
}

async function connect(
  fn: (client: Redis) => Promise<string | null | undefined>
): Promise<string | null | undefined> {
  return new Promise(async (resolve, _) => {
    try {
      let client: Redis | null = null;
      if (cached.client) {
        client = cached.client;
      }
      if (!client) throw new Error("Redis client is not defined");

      const status = client.status;
      if (status === "ready") return resolve(fn(client));
      client.on("error", (err) => {
        setTimeout(() => {
          throw err;
        }, 0);
      });
      if ((status === "end" || status === "close") && !cached.promise)
        cached.promise = client.connect((err) =>
          setTimeout(() => {
            throw err;
          }, 0)
        );

      await cached.promise;
      client.on("ready", () => resolve(fn(client)));
    } catch (err: any) {
      console.log(err);
      return null;
    }
  });
}

export const setCache = async (
  key: string,
  value: string,
  expirationTimeInSeconds?: number
) =>
  connect(async (client) => {
    try {
      if (expirationTimeInSeconds) {
        // Set the key with an expiration time
        await client.set(key, value, "EX", expirationTimeInSeconds);
      } else {
        // Set the key without an expiration time
        await client.set(key, value);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  });

export const getCache = (key: string) =>
  connect(async (client) => {
    try {
      // console.log("redis get key", key);
      const isExist = await client.exists(key);
      if (!isExist) {
        // console.log("miss");
        return null;
      }
      // console.log("hit");
      const data = await client.get(key);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  });
//
export const delCache = (key: string) =>
  connect(async (client) => {
    try {
      await client.del(key);
    } catch (err) {
      console.error(err);
      return null;
    }
  });

//create index
