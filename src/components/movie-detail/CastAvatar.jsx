import { imageBase } from "@/helpers/movieDb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { initials } from "@/lib/utils";

export default function CastAvatar({ person: { profile_path, name } }) {
	return (
		<div className="flex gap-2 items-center">
			<Avatar>
				{profile_path && (
					<AvatarImage
						className="object-cover"
						src={`${imageBase}/w92/${profile_path}`}
						alt={`Image of ${name}`}
					/>
				)}
				<AvatarFallback>{initials(name)}</AvatarFallback>
			</Avatar>
			{name}
		</div>
	);
}
