import { ImageResponse } from "next/og";

// Image metadata
export const alt = "KAI sushi&lounge";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const post = await fetch(
    `https://ik.imagekit.io/wpyygwzdr/kai/OG_IMG.HEIC`
  ).then((res) => res.json());
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {post.title}
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
