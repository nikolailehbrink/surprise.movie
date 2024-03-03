import { Backspace } from "@phosphor-icons/react";
import { Form, useSearchParams } from "@remix-run/react";
import { Button } from "./ui/button";

export default function FilterReset() {
  const [searchParams] = useSearchParams();

  return (
    <Form>
      <Button disabled={searchParams.size === 0} name="" variant="outline">
        <Backspace size={24} weight="duotone" />
        Reset
      </Button>
    </Form>
  );
}
