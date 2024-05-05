import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
const checksumKey = process.env.PAYOS_CHECKSUM_KEY;
if (!checksumKey) throw new Error("Checksum key is not defined");

function sortObjDataByKey(object) {
  const orderedObject = Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  return orderedObject;
}

export function generateHmacPayOS(body: Record<any, any>) {
  const sortedDataByKey = sortObjDataByKey(body);
  const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
  return crypto
    .createHmac("sha256", checksumKey!)
    .update(dataQueryStr)
    .digest("hex");
}
function isValidData(data, currentSignature, checksumKey) {
  const sortedDataByKey = sortObjDataByKey(data);
  const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
  const dataToSignature = crypto
    .createHmac("sha256", checksumKey)
    .update(dataQueryStr)
    .digest("hex");
  return dataToSignature == currentSignature;
}

function convertObjToQueryStr(object) {
  return Object.keys(object)
    .filter((key) => object[key] !== undefined)
    .map((key) => {
      let value = object[key];
      // Sort nested object
      if (value && Array.isArray(value)) {
        value = JSON.stringify(value.map((val) => sortObjDataByKey(val)));
      }
      // Set empty string if null
      if ([null, undefined, "undefined", "null"].includes(value)) {
        value = "";
      }

      return `${key}=${value}`;
    })
    .join("&");
}

export const verifyPayOSSignature =
  (fn) =>
  async (
    req: NextRequest & {
      verifiedData: PayOsType.WebhookDataType;
    },
    ...args: any[]
  ) => {
    const body = await req.json();
    console.log(body);
    const { code, data, signature } = body;
    if (code != "00" || !data || !signature) {
      return NextResponse.json({ error: "Illegal request" }, { status: 400 });
    }
    const _isValid = isValidData(data, signature, checksumKey);

    if (!_isValid) {
      return NextResponse.json({ error: "Illegal request" }, { status: 400 });
    }
    req.verifiedData = data;

    return fn(req, ...args);
  };
