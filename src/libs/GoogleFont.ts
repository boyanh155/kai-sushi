import { Gideon_Roman, Nunito } from "next/font/google";

export const gideon = Gideon_Roman({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
export const nunito = Nunito({
  weight: ["400", "700", "500", "300",'900'],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
