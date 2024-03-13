import { Backspace } from "@phosphor-icons/react";
import { Form, useSearchParams } from "@remix-run/react";
import { Button } from "./ui/button";
import { useSetAtom } from "jotai";
import { filterAtom } from "@/lib/atoms";

export default function FilterReset() {
  const [searchParams] = useSearchParams();
  const setFilterAtom = useSetAtom(filterAtom);

  return (
    <Form preventScrollReset>
      <Button
        disabled={searchParams.size === 0}
        name=""
        variant="outline"
        onClick={() => setFilterAtom({})}
      >
        <Backspace size={24} weight="duotone" />
        Reset
      </Button>
    </Form>
  );
}
