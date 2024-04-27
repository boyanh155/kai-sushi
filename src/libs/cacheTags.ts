export const menuHeaderTags = (headerId: string, locale: string) =>
  `menuHeader:${locale}:${headerId}`;

export const menuTags = (menuType: string, locale: string) =>
  `menu:${locale}:${menuType}`;

export const taPrefix = (locale: string) => "ta:" + locale + ":";
export const taTags = (taId: string, locale: string) => `ta:${locale}:${taId}`;

export const indexTaTags = (fields: string) => `ta_${fields}_idx`;

export const takeAwayTags = (locale: string) => `takeaway:${locale}`;
