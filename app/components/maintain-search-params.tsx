import { validSearchParams } from "@/lib/helpers";
import { useSearchParams } from "@remix-run/react";

type Props = {
  searchParam: (typeof validSearchParams)[number];
};

export default function MaintainSearchParams({ searchParam }: Props) {
  const [searchParams] = useSearchParams();

  const validParams = validSearchParams
    .filter((param) => param !== searchParam)
    .filter((param) => searchParams.has(param));

  return validParams.map((param) => {
    const value = searchParams.get(param);
    return (
      value && <input key={param} type="hidden" name={param} value={value} />
    );
  });
}
