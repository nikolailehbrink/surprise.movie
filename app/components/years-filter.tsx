import { Form } from "@remix-run/react";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import MaintainSearchParams from "./maintain-search-params";
import { ArrowsLeftRight, CheckCircle } from "@phosphor-icons/react";

type Props = {
  startYear: string | null;
  endYear: string | null;
  setYearFilterOpen: Dispatch<SetStateAction<boolean>>;
};

export default function YearsFilter({
  startYear,
  endYear,
  setYearFilterOpen,
}: Props) {
  const firstMovieYear = 1895;
  const currentYear = new Date().getFullYear();

  const [start, setStart] = useState(Number(startYear) || firstMovieYear);
  const [end, setEnd] = useState(Number(endYear) || new Date().getFullYear());

  useEffect(() => {
    if (!startYear) {
      setStart(firstMovieYear);
    }
  }, [startYear]);

  useEffect(() => {
    if (!endYear) {
      setEnd(currentYear);
    }
  }, [endYear]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<number>>,
    defaultValue: number,
  ) {
    const value = parseInt(e.currentTarget.value);

    typeof value === "number" && !isNaN(value)
      ? setState(value)
      : setState(defaultValue);
  }

  return (
    <Form
      className="flex items-center gap-2 text-white"
      onSubmit={() => setYearFilterOpen(false)}
    >
      <Input
        className="focus-visible:border-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        type="number"
        name={start !== firstMovieYear ? "primary_release_date.gte" : ""}
        value={start}
        onChange={(e) => handleInputChange(e, setStart, firstMovieYear)}
        min={firstMovieYear}
        max={end}
      />
      <ArrowsLeftRight size={24} weight="duotone" className="shrink-0" />

      <Input
        className="focus-visible:border-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        type="number"
        name={end !== currentYear ? "primary_release_date.lte" : ""}
        value={end}
        onChange={(e) => handleInputChange(e, setEnd, currentYear)}
        max={currentYear}
        min={start}
      />

      <Button
        variant="outline"
        size="icon"
        className="shrink-0"
        disabled={start > end || start < firstMovieYear || end > currentYear}
        type="submit"
      >
        <CheckCircle size={24} weight="duotone" />
        <span className="sr-only">Validate</span>
      </Button>
      <MaintainSearchParams
        params={["primary_release_date.gte", "primary_release_date.lte"]}
      />
    </Form>
  );
}
