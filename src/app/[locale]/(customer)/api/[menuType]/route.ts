import cloudinary from "@/libs/cloudinary";
import connectDB from "@/libs/connectDb";
import { menuChildModel, menuHeaderModel } from "@/models/Menu";
import { NextRequest, NextResponse } from "next/server";
import { NavChild } from "@/../types/NavbarType";
import { isEmpty } from "lodash";
import { delCache, getCache, setCache } from "@/libs/redisConnection";
import { menuTags } from "@/libs/cacheTags";
import { headerLocaleKey } from "../../../../../../constant/apiHelper";

type MenuType = "food" | "beverage";

type Params = {
  params: {
    menuType: MenuType | "both";
    locale: string;
  };
};

export async function GET(
  req: NextRequest,
  { params: { menuType = "both" } }: Params
) {
  try {
    if (menuType !== "food" && menuType !== "beverage" && menuType !== "both") {
      throw { message: "Invalid menu type", status: 404 };
    }
    const locale = req.headers.get(headerLocaleKey) || "en";
//

    const cacheKey = menuTags(menuType);
    const cachedData = await getCache(cacheKey);
    let data: Array<any> = [];
    if (!cachedData) {
      await connectDB();
      data = await menuHeaderModel.find(
        menuType === "both"
          ? {}
          : {
              type: menuType,
            },
        {
          imageId: 0,
          children: 0,
          __v: 0,
        }
      );
      setCache(cacheKey, JSON.stringify(data));
    } else {
      data = JSON.parse(cachedData);
    }
    if (locale === "en") {
      data = [...data].map((item) => ({
        ...item,
        title: item.enTitle,
      }));
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params: { menuType = "food" } }: Params
) {
  try {
    await connectDB();
    const body = await request.formData();
    // handle file
    const image = body.get("image") as File;
    const _imgInfo: {
      id: string;
      url: string;
    } = {
      id: "",
      url: "",
    };
    if (image) {
      const arrBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrBuffer);
      const imagePromise = new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            {
              folder: "menu",
            },
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });
      const imageResponse =
        (await imagePromise) as cloudinary.UploadApiResponse;

      _imgInfo.url = imageResponse.secure_url;
      _imgInfo.id = imageResponse.public_id;
    }

    // handle data
    const children: NavChild[] = body.get("children")
      ? JSON.parse(body.get("children")! as string)
      : [];

    // const data = await menuHeaderModel.create(request.body);
    if (!body) throw new Error("Invalid body");
    const bodyIds: string[] = [];
    if (!isEmpty(children)) {
      // content

      const content = children?.reduce((acc: any, item: any) => {
        if (item.children) {
          acc.push(item.children);
        }
        return acc;
      }, []);

      const contentIds: string[][] = [];
      for (const item of content) {
        const _jtemBuff: string[] = [];
        for (const _jtem of item) {
          if (isEmpty(_jtem)) continue;
          const _new = await menuChildModel.create({
            title: _jtem.title,
            type: "content",
            order: _jtem.order,
            description: _jtem.description,
            price: _jtem.price,
          });
          _jtemBuff.push(_new?.id);
        }
        if (!isEmpty(_jtemBuff)) contentIds.push(_jtemBuff);
      }
      // body

      const _body = [...children];

      for (const _id in _body) {
        const item = _body[_id];
        if (isEmpty(item)) continue;
        const _new = await menuChildModel.create({
          title: item.title,
          type: "body",
          order: item.order,
          description: item.description,

          children: contentIds[_id],
        });
        bodyIds.push(_new?.id);
      }

      // header
    }

    const title = body.get("title") as string;
    const slug = body.get("slug") as string;
    const order = body.get("order") as string;

    const _new = await menuHeaderModel.create({
      title,
      slug,
      children: bodyIds,
      order: order,
      type: menuType,
      image: _imgInfo.url,
      imageId: _imgInfo.id,
    });
    const cacheKey = menuTags(menuType);
    const cacheKey2 = menuTags("both");
    delCache(cacheKey);
    delCache(cacheKey2);
    return NextResponse.json(
      {
        success: true,
        data: _new,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.stack,
      },
      { status: 500 }
    );
  }
}
