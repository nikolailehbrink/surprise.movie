import { getMovieDetails, imageBase, imageConfig } from "@/lib/movieDb";
import { LoaderFunctionArgs, MetaFunction, json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import MovieDetailContent from "@/components/movie-detail-content";
import MovieDetailSidebar from "@/components/movie-detail-sidebar";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "No movie ID provided");
  const id = params.id;
  const movie = await getMovieDetails(id);

  return json({ movie });
};

export default function SingleMovie() {
  const { movie } = useLoaderData<typeof loader>();

  return (
    <div className="container flex pb-8">
      <div className="flex w-full gap-4 max-lg:flex-col-reverse xl:gap-8">
        <MovieDetailSidebar movie={movie} />
        <MovieDetailContent movie={movie} />
      </div>
    </div>
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const { movie } = data;
  const title = `surprise.movie - ${movie.original_title} ${movie.release_date && `(${new Date(movie.release_date).getFullYear()})`}`;
  const description = movie.overview
    ? movie.overview.length < 160
      ? movie.overview
      : movie.overview.substring(0, 160) + "..."
    : "There is no movie description available.";
  const image = movie.poster_path
    ? `${imageBase}${imageConfig.backdrop_sizes[2]}${movie.backdrop_path}`
    : "https://via.placeholder.com/1200x630?text=No+poster";
  return [
    {
      title: title,
    },
    {
      name: "description",
      content: description,
    },
    {
      property: "og:image",
      content: image,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:image",
      content: image,
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
  ];
};
