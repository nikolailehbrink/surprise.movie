import { ValidSearchParam } from "@/lib/helpers";
import { useSearchParams } from "@remix-run/react";

export default function useSearchParamModification(
  input: string | number,
  searchParam: ValidSearchParam,
) {
  const [searchParams] = useSearchParams();

  let param: ValidSearchParam | "" = searchParam;
  let value = searchParams.get(param) ?? "";
  const providers = value.split("|");
  const hasProviderInParams = providers.includes(input.toString());
  const hasSingleProvider = providers.length === 1;

  const hasNoValue = !value;

  if (hasSingleProvider && hasProviderInParams) {
    // Removes "streaming" from the search params
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
