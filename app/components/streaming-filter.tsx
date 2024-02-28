import { Form, useSearchParams } from "@remix-run/react";
import StreamingFilterButton from "./streaming-filter-button";
import { useEffect } from "react";

export default function StreamingFilter() {
  //   console.log(watchProviders?.split("|"));
  const [searchParams, setSearchParams] = useSearchParams();
  const watchProviders = searchParams.get("with_watch_providers");

  useEffect(() => {
    if (!watchProviders) {
      searchParams.delete("with_watch_providers");
      setSearchParams(searchParams);
    }
  }, [watchProviders, searchParams, setSearchParams]);

  return (
    <div>
      <Form className="flex flex-col gap-2">
        <StreamingFilterButton
          id={8}
          name="Netflix"
        />
        <StreamingFilterButton
          id={9}
          name="Amazon Prime Video"
        />
      </Form>
    </div>
  );
}
