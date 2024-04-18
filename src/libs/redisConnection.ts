import Redis from "ioredis";

export const client = new Redis({
  password: "H456Lyt5cVDH7l9HRc58kuMHrvJOHpX1",
  host: "redis-10772.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 10772,
});

export async function setCache(key: string, value: string) {
  client.set(key, value);
}

export async function getCache(key: string) {
  try {
    const isExist = await client.exists(key);
    if (!isExist) return null;
    const data = await client.get(key);
    if (data) console.log("hit");
    return data;
  } catch (err) {
    console.error(err);
  }
}
