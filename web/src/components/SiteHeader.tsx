import { CarFront, ExternalLink, Github, Menu } from "lucide-react";
import Link from "next/link";

type SiteHeaderProps = {
  active: "home" | "console";
};

const linkClass =
  "border-b-2 px-1 py-5 text-sm font-medium transition-colors hover:text-white";

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-[1000] h-16 border-b border-white/10 bg-[#071a3a] text-white shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="RideShare home">
          <span className="flex size-9 items-center justify-center rounded-md bg-white text-[#071a3a]">
            <CarFront className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold">RideShare</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          <Link
            href="/"
            className={`${linkClass} ${active === "home" ? "border-blue-400 text-white" : "border-transparent text-slate-300"}`}
          >
            Home
          </Link>
          <Link
            href="/ride-console"
            className={`${linkClass} ${active === "console" ? "border-blue-400 text-white" : "border-transparent text-slate-300"}`}
          >
            Ride Console
          </Link>
          <a
            href="https://github.com/martinrgarciap/RideShare"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            GitHub
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-white/20 text-slate-100 hover:bg-white/10 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open navigation</span>
            <Menu className="size-5" aria-hidden="true" />
          </summary>
          <nav
            className="absolute right-0 mt-2 w-48 overflow-hidden rounded-md border border-slate-200 bg-white py-1 text-slate-800 shadow-lg"
            aria-label="Mobile navigation"
          >
            <Link href="/" className="block px-4 py-3 text-sm font-medium hover:bg-slate-50">
              Home
            </Link>
            <Link href="/ride-console" className="block px-4 py-3 text-sm font-medium hover:bg-slate-50">
              Ride Console
            </Link>
            <a
              href="https://github.com/martinrgarciap/RideShare"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-slate-50"
            >
              <Github className="size-4" aria-hidden="true" />
              GitHub
              <ExternalLink className="ml-auto size-3.5" aria-hidden="true" />
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
