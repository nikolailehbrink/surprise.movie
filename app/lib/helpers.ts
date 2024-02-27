import { LoaderFunction, MetaFunction } from "@vercel/remix";

// https://remix.run/docs/en/main/route/meta#meta-merging-helper
export const mergeMeta = <
  Loader extends LoaderFunction | unknown = unknown,
  ParentsLoaders extends Record<string, LoaderFunction | unknown> = Record<
    string,
    unknown
  >,
>(
  leafMetaFn: MetaFunction<Loader, ParentsLoaders>,
): MetaFunction<Loader, ParentsLoaders> => {
  return (arg) => {
    const leafMeta = leafMetaFn(arg);

    return arg.matches.reduceRight((acc, match) => {
      for (const parentMeta of match.meta) {
        const index = acc.findIndex(
          (meta) =>
            ("name" in meta &&
              "name" in parentMeta &&
              meta.name === parentMeta.name) ||
            ("property" in meta &&
              "property" in parentMeta &&
              meta.property === parentMeta.property) ||
            ("title" in meta && "title" in parentMeta),
        );
        if (index == -1) {
          // Parent meta not found in acc, so add it
          acc.push(parentMeta);
        }
      }
      return acc;
    }, leafMeta);
  };
};

export function hasValidSearchParams(searchParams: URLSearchParams) {
  const params = ["streaming", "start", "end", "rating", "genre"];
  return params.some((param) => searchParams.has(param));
}