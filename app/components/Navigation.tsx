import { Heart } from "@phosphor-icons/react";
import Logo from "@/assets/logo.svg?react";
import { Link, NavLink } from "@remix-run/react";
import { buttonVariants } from "@/components/ui/button";

export default function Navigation() {
  return (
    <>
      <div className="absolute -top-8 z-30 h-32 w-full bg-white/10 blur-3xl"></div>
      <div className=" fixed inset-0 top-0 z-20 h-32 bg-gradient-to-b from-black via-black/50 via-60% to-transparent"></div>
      <nav className="container sticky top-0 z-50 flex items-center justify-between py-4">
        <Link to="/">
          <Logo />
        </Link>
        <menu className="flex items-center gap-2 font-bold sm:gap-4">
          {/* <Share /> */}
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              buttonVariants({
                variant: isActive ? "default" : "outline",
              })
            }
          >
            <Heart size={24} weight="duotone" />
            <span className="max-sm:sr-only">Watchlist</span>
          </NavLink>
        </menu>
      </nav>
    </>
  );
}
