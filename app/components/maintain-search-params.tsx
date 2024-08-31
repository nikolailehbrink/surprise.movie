import { ValidSearchParam, validSearchParams } from "@/lib/helpers";
import { useSearchParams } from "@remix-run/react";

type Props = {
  exclude: ValidSearchParam | ValidSearchParam[];
};

// https://www.jacobparis.com/content/existing-params
export default function MaintainSearchParams({ exclude }: Props) {
  const [searchParams] = useSearchParams();
  let validParams: ValidSearchParam[] = [];

  if (Array.isArray(exclude)) {
    validParams = validSearchParams.filter(
      (param) => !exclude.includes(param) && searchParams.has(param),
    );
  } else {
    validParams = validSearchParams.filter(
      (param) => param !== exclude && searchParams.has(param),
    );
  }

  return validParams.map((param) => {
    const value = searchParams.get(param);
    return (
      value && <input key={param} type="hidden" name={param} value={value} />
    );
  });
}
