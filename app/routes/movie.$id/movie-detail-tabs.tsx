import { MovieDetails } from "types/tmdb/movie-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditsSection from "@/components/credits-section";
import CastAvatar from "@/components/cast-avatar";
import StreamingProviderTooltip from "@/components/streaming-provider-tooltip";

export default function MovieDetailTabs({ movie }: { movie: MovieDetails }) {
  const streamingProvider =
    movie["watch/providers"]?.results["US"]?.flatrate ?? [];

  const trailer = movie?.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  const actors =
    movie?.credits?.cast
      ?.filter((actor) => actor.known_for_department === "Acting")
      ?.slice(0, 10) ?? [];

  const director = movie?.credits?.crew?.find(
    (person) => person.job === "Director",
  );
  const composer = movie?.credits?.crew?.find(
    (person) => person.job === "Original Music Composer",
  );
  return (
    <Tabs defaultValue="credits">
      <TabsList>
        {(director || composer || actors.length > 0) && (
          <TabsTrigger value="credits">Credits</TabsTrigger>
        )}
        {trailer && <TabsTrigger value="trailer">Trailer</TabsTrigger>}
        {streamingProvider.length > 0 && (
          <TabsTrigger value="streaming" className="lg:hidden">
            Streaming
          </TabsTrigger>
        )}
      </TabsList>
      {trailer && (
        <TabsContent value="trailer">
          <div className="overflow-hidden rounded-lg border-2">
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </TabsContent>
      )}
      {(director || actors.length > 0 || composer) && (
        <TabsContent value="credits" className="mt-3">
          <div className="flex flex-col gap-3">
            {director && (
              <CreditsSection department="Director">
                <CastAvatar
                  name={director.name}
                  imagePath={director.profile_path ?? undefined}
                />
              </CreditsSection>
            )}

            {actors.length > 0 && (
              <CreditsSection department="Actors">
                <div className="flex flex-wrap gap-4">
                  {actors.map((actor) => (
                    <CastAvatar
                      key={actor.id}
                      name={actor.name}
                      imagePath={actor.profile_path ?? undefined}
                    />
                  ))}
                </div>
              </CreditsSection>
            )}
            {composer && (
              <CreditsSection department="Music">
                <CastAvatar
                  name={composer.name}
                  imagePath={composer.profile_path ?? undefined}
                />
              </CreditsSection>
            )}
          </div>
        </TabsContent>
      )}
      {streamingProvider.length > 0 && (
        <TabsContent value="streaming" className="lg:hidden">
          <div className="flex flex-wrap gap-2">
            {streamingProvider.map(
              ({ provider_id, provider_name, logo_path }) => (
                <StreamingProviderTooltip
                  key={provider_id}
                  provider={provider_name}
                  logoPath={logo_path}
                />
              ),
            )}
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
