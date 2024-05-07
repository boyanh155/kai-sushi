const crypto = require("crypto");

const checksumKey ='8653411e6304ab3247e8449a68851e68685fe5a4ff9792b15d52d961c39cba5b'


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
function sortObjDataByKey(object) {
  const orderedObject = Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  return orderedObject;
}

 function generateHmacPayOS(body) {
  const sortedDataByKey = sortObjDataByKey(body);
  const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
  //console.log(dataQueryStr)
  return crypto
    .createHmac("sha256", checksumKey)
    .update(dataQueryStr)
    .digest("hex");
}
const fn = () => {
  const body = {
  "orderCode": 123,
  "amount": 56000000,
  "description": "VQRIO123",
  "buyerName": "Nguyen Van A",
  "buyerEmail": "buyer-email@gmail.com",
  "buyerPhone": "090xxxxxxx",
  "buyerAddress": "số nhà, đường, phường, tỉnh hoặc thành phố",
  "items": [
    {
      "name": "Iphone",
      "quantity": 2,
      "price": 28000000
    }
  ],
  "cancelUrl": "https://2d57-1-54-155-202.ngrok-free.app/vi/api/server/payos",
  "returnUrl": "https://2d57-1-54-155-202.ngrok-free.app/vi/api/server/payos",
  "expiredAt": 1696559798,
}

  const signature = generateHmacPayOS(body);
  console.log(signature);
};

fn();
