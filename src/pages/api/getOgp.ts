import { JSDOM } from "jsdom";

import { OgpData } from "../../types";

import type { NextApiRequest, NextApiResponse } from "next";
import console from "console";

async function getOgp(req: NextApiRequest, res: NextApiResponse<OgpData>) {
  // クエリパラメタからURL情報を受け取り、エンコードする
  const { url } = req.query;
  const encodeURL = encodeURI(url as string);

  // エンコード済みURLに対してリクエストを行い、レスポンスからopgDataを抽出する
  try {
    const response = await fetch(encodeURL)
      .then((res) => res.text())
      .then((text) => {
        const dom = new JSDOM(text);

        // metaタグ、titleタグの要素を取得
        const meta = dom.window.document.head.querySelectorAll("meta");
        const titleTag = dom.window.document.title;

        // nameかpropertyで'og:'という文字列を持っているmetaタグを抽出
        const tagsContainingOg = Array.from(meta).filter((tag) => {
          const property = tag.getAttribute("property");
          const name = tag.getAttribute("name");
          const checkOg = (text: string) => text.substring(0, 3) === "og:";

          return checkOg(property ?? "") || checkOg(name ?? "");
        });

        // OgpDateを抽出
        const ogp = tagsContainingOg.reduce((previous: any, tag: Element) => {
          // property属性かname属性かを判定
          const attr = tag.hasAttribute("property")
            ? tag.getAttribute("property")
            : tag.getAttribute("name");

          // "og:image"などから"og:"を取り除いたものをkeyに用いる
          const key = attr?.trim().replace("og:", "") ?? "";

          // content属性をvalueに用いる
          const content = tag.getAttribute("content") ?? "";
          previous[key] = content;

          return previous;
        }, {});

        // ”https://” を除いた、最初の/まで抜き出す
        const siteUrl = ogp["url"].substring(
          0,
          ogp["url"].indexOf("/", 8)
        ) as string;

        // 多くのサイトはroot/favicon.icoでfaviconを取得できるようになっているらしい
        const faviconPath = "/favicon.ico";

        const ogpData: OgpData = {
          title: titleTag,
          description: ogp["description"] as string,
          faviconUrl: siteUrl + faviconPath,
          ogImgUrl: ogp["image"] as string,
          pageUrl: url as string,
        };

        return ogpData;
      });

    // 返ってきたデータから、title, description, ogImgUrl, faviconUrl, pageeUrlを抽出して返す
    const { pageUrl, title, description, faviconUrl, ogImgUrl } = response;

    res.status(200).json({
      pageUrl,
      title,
      description,
      faviconUrl,
      ogImgUrl,
    });
  } catch (error) {
    // エラーが起きた際にもOgpDate型の情報が返ってくるようにする
    res.status(200).json({
      title: "Sorry！うまく取得できなかったっぽいです🙇‍♂️",
      description: "",
      faviconUrl: "",
      ogImgUrl: "",
      pageUrl: url as string,
    });

    // デバッグ用
    console.log({ error });
  }
}

export default getOgp;
