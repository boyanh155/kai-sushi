import Jimp from "jimp";
import path from "path";
import QRCode from "qrcode";
import fs from "fs";

export async function generateQRCodeWithLogo(text: string, outputPath: string) {
  // Generate QR code

  const qrCodeImage = await QRCode.toBuffer(text, { type: "png" });

  // Read the QR code and the logo
  const [qr, logo] = await Promise.all([
    Jimp.read(qrCodeImage),
    Jimp.read(path.join(process.cwd(), "public/logo.png")),
  ]);

  // Resize the logo
  logo.resize(qr.bitmap.width / 5, Jimp.AUTO);

  // Calculate the position for the logo (center of the QR code)
  const logoPos = {
    x: (qr.bitmap.width - logo.bitmap.width) / 2,
    y: (qr.bitmap.height - logo.bitmap.height) / 2,
  };
  console.log(";");
  // Composite the logo onto the QR code
  qr.composite(logo, logoPos.x, logoPos.y);
  console.log("w");
  // Save the final image
  // await qr.writeAsync(path.join(process.cwd(), "public", outputPath));
  await qr.writeAsync(path.join("/tmp", outputPath));
  console.log("dsd");
}
