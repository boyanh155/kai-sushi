import createHmac from "create-hmac";

const secret = process.env.NEXT_PUBLIC_PAYMENT_SECRET_KEY;
if (!secret) throw new Error("Payment secret key is not defined");

export const generateHmacBrowser = async (body: any) =>
  await createHmac(body, Buffer.from(secret)).digest("hex");
