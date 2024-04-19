import Redis from "ioredis";

export const client = new Redis({
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "10772"),
  maxRetriesPerRequest: null,

});

export async function setCache(key: string, value: string) {
  try{

    client.set(key, value);
  }catch(err){
    console.log(err)
    return null
  }
}

export async function getCache(key: string) {
  try {
    const isExist = await client.exists(key);
    if (!isExist) return null;
    const data = await client.get(key);
    if (data) console.log("hit");
    return data;
  } catch (err) {
    return null
    console.error(err);
  }
}

export async function delCache(key: string) {
  client.del(key);
}
