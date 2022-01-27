import { VFC } from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export const LoadingDesktop: VFC = () => {
  return (
    <div className="hidden md:block">
      <article className="flex justify-between w-full h-40 rounded border border-gray-400 border-solid ">
        <div className="flex flex-col justify-between p-5 w-3/5">
          {/* title用 */}
          <div className="w-3/5">
            <Skeleton className="w-full" />
          </div>

          {/* description用 */}
          <Skeleton count={2} className="w-full" />

          {/* pageUrl用 */}
          <Skeleton className="w-full" />
        </div>

        {/* ogpImg用 */}
        <div className="w-2/5 h-full rounded">
          <Skeleton className="h-full " />
        </div>
      </article>
    </div>
  );
};

export const LoadingMobile = () => {
  return (
    <div className="md:hidden">
      <article className="flex flex-col justify-between rounded border border-gray-400 border-solid">
        {/* ogpImg用 */}
        <div className="w-full h-40 rounded">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="flex flex-col justify-between p-5 w-full h-40 hover:bg-gray-100">
          {/* title用 */}
          <Skeleton />

          {/* description用 */}
          <Skeleton count={2} />

          {/* pageUrl用 */}
          <Skeleton />
        </div>
      </article>
    </div>
  );
};

// Presentational Component Container
export const Loading = () => (
  <>
    <LoadingMobile />
    <LoadingDesktop />
  </>
);
