import { Button } from "@/components/ui/button";
import { getRandomMovie } from "@/lib/movieDb";
import { Form, useActionData, useNavigation } from "@remix-run/react";

export default function Index() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <div>
      <h1 className="text-wrap text-4xl font-bold text-sky-500">
        Welcome to Remix
      </h1>
      <Form method="post">
        <Button disabled={navigation.state === "submitting"}>
          Surprise me!
        </Button>
      </Form>
      {data && (
        <pre className="overflow-auto">
          {JSON.stringify(data.movie, null, 2)}
        </pre>
      )}
    </div>
  );
}
export const action = async () => {
  const movie = await getRandomMovie();
  return { movie };
};
