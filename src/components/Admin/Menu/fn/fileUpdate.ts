import cloudinary from "@/libs/cloudinary";

export const fileUpdateHandler = async (file?: File) => {
  "use server";
  if (!file) return;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({}, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      })
      .end(buffer);
  });
};
