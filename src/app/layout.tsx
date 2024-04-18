import { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};
export const metadata = {
  metadataBase: new URL("https://acme.com"),
  openGraph: {
    images: "https://ik.imagekit.io/wpyygwzdr/kai/OG_IMG.HEIC",
  },
};
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
