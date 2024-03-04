import { ValidSearchParam, validSearchParams } from "@/lib/helpers";
import { useSearchParams } from "@remix-run/react";

type Props = {
  params: ValidSearchParam | ValidSearchParam[];
};

export default function MaintainSearchParams({ params }: Props) {
  const [searchParams] = useSearchParams();
  let validParams: ValidSearchParam[] = [];

  if (Array.isArray(params)) {
    validParams = validSearchParams.filter(
      (param) => !params.includes(param) && searchParams.has(param),
    );
  } else {
    validParams = validSearchParams.filter(
      (param) => param !== params && searchParams.has(param),
    );
  }

  return validParams.map((param) => {
    const value = searchParams.get(param);
    return (
      value && <input key={param} type="hidden" name={param} value={value} />
    );
  });
}
