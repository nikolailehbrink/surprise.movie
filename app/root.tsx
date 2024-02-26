import { LinksFunction } from "@vercel/remix";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "@fontsource-variable/inter";

import styles from "@/globals.css?url";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { Analytics } from "@vercel/analytics/react";
import type { MetaFunction } from "@vercel/remix";
import Navigation from "./components/layout/navigation";
import Footer from "./components/layout/footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "surprise.movie - Discover your next favorite movie" },
    {
      name: "description",
      content:
        "Explore and save top-rated movies from your streaming providers, preferred genres and more.",
    },
  ];
};
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark scroll-smooth bg-background font-inter text-foreground scrollbar-thin scrollbar-track-neutral-500 scrollbar-thumb-neutral-700 hover:scrollbar-thumb-neutral-800 active:scrollbar-thumb-neutral-400"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Navigation />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
