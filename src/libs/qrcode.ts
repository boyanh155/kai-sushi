import Jimp from "jimp";
import path from "path";
import QRCode from "qrcode";
import cloudinary from "./cloudinary";
import { IBooking } from "../../types/Booking";

export async function generateQRCodeWithLogo(
  text: string,
  bookingInfo: IBooking
) {
  // Generate QR code

  const qrCodeImage = await QRCode.toBuffer(text, { type: "png" });

  // Read the QR code and the logo
  const [qr, logo] = await Promise.all([
    Jimp.read(qrCodeImage),
    Jimp.read(path.join(process.cwd(), "public/logo-whitebg.png")),
  ]);

  // Resize the logo
  logo.resize(qr.bitmap.width / 5, Jimp.AUTO);

  // Calculate the position for the logo (center of the QR code)
  const padding = 5; // Adjust this value to change the padding
  const paddedLogo = new Jimp(
    logo.bitmap.width + padding * 2,
    logo.bitmap.height + padding * 2,
    0xffffffff
  );
  paddedLogo.composite(logo, padding, padding);
  const logoPos = {
    x: (qr.bitmap.width - paddedLogo.bitmap.width) / 2,
    y: (qr.bitmap.height - paddedLogo.bitmap.height) / 2,
  };

  // Composite the logo onto the QR code
  qr.composite(paddedLogo, logoPos.x, logoPos.y);

  // upload to cloudinary
  const imageBuffer = await qr.getBufferAsync(Jimp.MIME_PNG);

  const result: any | undefined = await new Promise(
    (resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            resource_type: "raw",
            public_id: bookingInfo._id,
            folder: "qrcode-booking",
            filename_override: `${bookingInfo._id}.png`,
          },
          (error: any, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(imageBuffer);
    }
  );
  if (!result) return undefined;
  // Save the final image
  // await qr.writeAsync(path.join(process.cwd(), "public", outputPath));
  // await qr.writeAsync(path.join("/tmp", outputPath));
  return result.secure_url;
}
