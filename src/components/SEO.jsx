import { Helmet } from "react-helmet-async";

export default function SEO({
	title,
	description,
	type = "website",
	image = null,
	children,
}) {
	const siteTitle = `surprise.movie - ${title}`;

	return (
		<Helmet>
			<title>{siteTitle}</title>
			<meta name="description" content={description} />

			<meta property="og:type" content={type} />
			<meta property="og:title" content={siteTitle} />
			<meta property="og:description" content={description} />
			<meta
				property="og:url"
				content={new URL(window.location.origin + window.location.pathname)}
			/>

			{image ? (
				<>
					<meta property="og:image" content={image} />
					<meta name="twitter:image" content={image} />
				</>
			) : (
				<>
					<meta
						property="og:image"
						content="https://surprise.movie/og_image.png"
					/>
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />

					<meta
						name="twitter:image"
						content="https://surprise.movie/og_image.png"
					/>
				</>
			)}

			<meta name="twitter:title" content={siteTitle} />
			<meta name="twitter:card" content={type} />
			<meta name="twitter:description" content={description} />

			{children}
		</Helmet>
	);
}
