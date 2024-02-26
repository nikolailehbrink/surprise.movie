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
import Navigation from "./components/navigation";
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
      className="scrollbar-thumb-neutral-700 hover:scrollbar-thumb-neutral-800 scrollbar-thin active:scrollbar-thumb-neutral-400 scrollbar-track-neutral-500 dark scroll-smooth bg-background font-inter text-foreground"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation />
        {children}
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
