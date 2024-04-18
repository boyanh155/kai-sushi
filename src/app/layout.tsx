import { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL!),
  openGraph: {
    images: [
      {
        url: "https://ik.imagekit.io/wpyygwzdr/kai/OG_IMG.HEIC",
      },
    ],
  },
};
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
