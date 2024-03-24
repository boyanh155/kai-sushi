import {
  NavChild,
  NavChildType,
  NavHeader,
} from "../../../../types/NavbarType";

const saladChildren: NavChild[] = [
  {
    title: "salad da ca hoi",
    type: NavChildType.Content,
    price: 2000000,
  },
  {
    title: "salad da ca hoi",
    type: NavChildType.Content,
    price: 2000000,
  },
  {
    title: "salad da ca hoi",
    type: NavChildType.Content,
    price: 2000000,
  },
];
const appetizersChildren: NavChild[] = [
  {
    title: "dau nhanh nhat",
    type: NavChildType.Content,
    price: 1000000,
    description: `3 cá hồi, 3 cá ngừ, 3 bạch tuộc`,
  },
  {
    title: "dau nhanh nhat",
    type: NavChildType.Content,
    price: 1000000,

    description: `2 cá hồi, 2 cá ngừ, 2 cá mú bông, 3 cá trích
ép trứng, 2 sò điệp, trứng cá chuồn, thanh cua`,
  },
  {
    title: "dau nhanh nhat",
    price: 1000000,

    type: NavChildType.Content,
    description: `3 cá hồi, 3 bụng cá hồi, 3 cá cam, 3 sò điệp, 3 cá mú bông, 3 cá trích ép trứng, trứng cá hồi`,
  },
];
const appetizers: NavChild[] = [
  {
    type: NavChildType.Body,
    title: "appetizers",
    NavChildren: appetizersChildren,
  },
];
const salads: NavChild[] = [
  {
    type: NavChildType.Body,
    title: "salad 1",
    NavChildren: saladChildren,
  },
  {
    type: NavChildType.Body,
    title: "salad 2",
    NavChildren: saladChildren,
  },
];
export const menuData: Array<NavHeader> = [
  {
    title: "appetizers",
    slug: "appetizers",
    NavChildren: appetizers,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
  },
  {
    title: "salad",
    slug: "salad",
    NavChildren: salads,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/8a50/32bd/a8f57d1eed97eecaa2c69eea9cd8d05b?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aCkf0CmWvyXbPbQflyJEYU6PbDqh-xL7mV7-C4-gO2pYpQlrhIgFnHOFDPMnkg59coQ-ayBFsYICQNhVnHWkArsJxs8M1KuwhBMCkdKsk6-5xbZukAzMhomIkKtBJQ4owq7QUL07r62b9ZnhNXJIQd3L7dDMqjUAVpoiDjqLf674NM4Vb~sKufq8Nn~5a9iWymLYyEbwT6uR4pAsdSh5Vbya40x2f6tMY-aN8gWDY58TDlJ2imk7fkkgrZfsCEsq-09OtLvG-FaE3xO2Apy9wZ1-Oicuoft0DgdIGmdv1sh9foZSx7NN19-wC~dC~6tkiZYAoetnhgKFWiUorS7BWw__`,
  },
  // TEST
  {
    title: "salad",
    slug: "salad",
    NavChildren: salads,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
  },
  {
    title: "salad",
    slug: "salad",
    NavChildren: salads,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
  },
  {
    title: "salad",
    slug: "salad",
    NavChildren: salads,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
  },
  {
    title: "salad",
    slug: "salad",
    NavChildren: salads,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
  },
  {
    title: "salad",
    slug: "salad",
    NavChildren: salads,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
  },
  {
    title: "salad",
    slug: "salad",
    NavChildren: salads,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
  },
  {
    title: "salad",
    slug: "salad",
    NavChildren: salads,
    type: "food",
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
  },
];

// BEVERAGE

const antiAlcoholChildren: NavChild[] = [
  {
    title: "sam nha dam",
    type: NavChildType.Content,
  },
  {
    title: "sam nha dam",
    type: NavChildType.Content,
  },
  {
    title: "sam nha dam",
    type: NavChildType.Content,
  },
];

const antiAlcohol: NavChild[] = [
  {
    type: NavChildType.Body,
    title: "anti alcohol",
    NavChildren: antiAlcoholChildren,
  },
];

export const beverageData: Array<NavHeader> = [
  {
    title: "anti alcohol",
    slug: "anti-alcohol",
    NavChildren: antiAlcohol,
    image: `https://s3-alpha-sig.figma.com/img/682e/2303/414f8f648fce7af362051c1ec8c3aeaa?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lo1tHIYbJVeGEyeJWOanY3atlXeCOOi6RMuc9JriLt5uXyojwFsGHzWAg8yCN7AQv7PqM4sNN1p3DRolCzyLXP~-XZrJ2GY~ouM03MLypt~hvyxsZvlMH1NKrZwaH3Rqc~ypgMgxGyuT02gbmXuHB3-0JenjlEJyWnheZSxPw6RYVsmx~fcsNthO8r4uFUV9B528IZTmH9hcvcnoIBUTyJRCVgQ0vePT-62K2h56ffHmgddm3GW7GmNSXQQdH0lXR09r-iWSC08If8CS2bkRExlwWO3C55VOHiCWyIFYe2zzJy0HNDG77guyI2g9G6RSv1CcUGcVdHaE2TjNfm9rrA__`,
    type: "beverage",
  },
];
