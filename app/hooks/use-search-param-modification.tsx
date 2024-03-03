import { validSearchParams } from "@/lib/helpers";
import { useSearchParams } from "@remix-run/react";

export default function useSearchParamModification(
  input: string | number,
  searchParam: (typeof validSearchParams)[number],
) {
  const [searchParams] = useSearchParams();

  let param: (typeof validSearchParams)[number] | "" = searchParam;
  let value = searchParams.get(param) ?? "";
  const providers = value.split("|");
  const hasProviderInParams = providers.includes(input.toString());
  const hasSingleProvider = providers.length === 1;

  const hasNoValue = !value;

  if (hasSingleProvider && hasProviderInParams) {
    // Removes "with_watch_providers" from the search params
    param = "";
  } else if (hasProviderInParams) {
    value = providers
      .filter((provider) => provider != input.toString())
      .join("|");
  } else if (!value) {
    value = input.toString();
  } else {
    value = `${value}|${input.toString()}`;
  }
  return {
    name: param,
    value,
    hasNoValue,
    isActive: hasProviderInParams,
  };
}
