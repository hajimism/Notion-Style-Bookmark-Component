/* eslint-disable @next/next/no-img-element */
import { VFC } from "react";
import { useOgp } from "../hooks/useOgp";
import { OgpData } from "../types";

interface BookmarkProps {
  ogp: OgpData;
}

export const BookmarkView: VFC<BookmarkProps> = ({ ogp }) => {
  const { title, description, faviconUrl, pageUrl, ogImgUrl } = ogp;
  const w = ogImgUrl ? "w-3/5" : "w-full";
  const ml = faviconUrl ? "ml-2" : "";

  return (
    <a href={pageUrl} target="_blank" rel="noreferrer">
      <article className="flex justify-between h-40 rounded border border-gray-400 border-solid">
        <div
          className={`flex flex-col justify-between p-5  hover:bg-gray-100 ${w}`}
        >
          <h3 className="text-2xl truncate">{title}</h3>
          <p className="overflow-hidden h-12 text-base text-gray-500">
            {description}
          </p>
          <div className="flex items-center">
            {faviconUrl && <img src={faviconUrl} className="h-6" alt="" />}
            <p className={`text-base truncate ${ml}`}>{pageUrl}</p>
          </div>
        </div>
        {ogImgUrl && (
          <div className="w-2/5 h-full rounded">
            <img src={ogImgUrl} className="object-cover w-full h-full" alt="" />
          </div>
        )}
      </article>
    </a>
  );
};

export const Bookmark: VFC<{ url: string }> = ({ url }) => {
  const { data, error } = useOgp(url);

  // for debug
  if (!error) console.log(error);

  if (!data) return <></>;

  return <BookmarkView ogp={data} />;
};
