"use server"

import crypto from "crypto";

const secret = process.env.PAYMENT_SECRET_KEY;
console.log(secret);

if (!secret) throw new Error("Payment secret key is not defined");
export const verifyBodyHmac = async (sign: string, body: any) => {
  try {
    const hmac = sign;
    const hash = await generateHmac(body);
    return hash === hmac;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const generateHmac = async (body: any) =>
  crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(body))
    .digest("hex");
