import CastAvatar from "./CastAvatar";

export default function CreditsSection({
	cast,
	department,
	multiplePersons = false,
}) {
	return !multiplePersons ? (
		<div className="flex flex-col gap-2">
			<strong>{department}</strong>
			<CastAvatar person={cast} />
		</div>
	) : (
		<div className="flex flex-col gap-2">
			<strong>{department}</strong>
			<div className="flex gap-4 flex-wrap">
				{cast.map((person) => (
					<CastAvatar key={person.id} person={person} />
				))}
			</div>
		</div>
	);
}
