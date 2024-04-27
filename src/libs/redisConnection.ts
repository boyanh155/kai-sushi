import Redis from "ioredis";




async function connect(
  fn: (client: Redis) => Promise<string | null | undefined>
): Promise<string | null | undefined> {
  return new Promise(async (resolve, _) => {
    try {
      const client = new Redis({
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "10772"),
        maxRetriesPerRequest: 10,
        connectTimeout: 10000,
      });
      const status = client.status;
      client.on('error',(err)=>{

        setTimeout(()=>{throw err},0)
      
      })
      if (status === "end" || status === "close") await client.connect((err)=>setTimeout(()=>{throw err},0));
      client.on("ready", () => resolve(fn(client)));
    } catch (err: any) {
      console.log(err)
      return null
    }
  });
}

export const setCache = async (key: string, value: string) =>
  connect(async (client) => {
    try {
      await client.set(key, value);
    } catch (err) {
      console.error(err);
      return null;
    }
  });

export const getCache = (key: string) =>
  connect(async (client) => {
    try {
      const isExist = await client.exists(key);
      if (!isExist) {
        console.log("miss");
        return null;
      }
      const data = await client.get(key);
      if (data) console.log("hit");
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
