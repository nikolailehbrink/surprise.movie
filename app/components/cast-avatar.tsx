import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { imageBase, imageConfig } from "@/lib/movieDb";

export default function CastAvatar({
  imagePath,
  name,
}: {
  imagePath?: string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Avatar>
        {imagePath && (
          <AvatarImage
            className="object-cover"
            src={`${imageBase}${imageConfig.profile_sizes[0]}${imagePath}`}
            alt={`Image of ${name}`}
            width={45}
            height={45 * 1.5}
          />
        )}
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      {name}
    </div>
  );
}
