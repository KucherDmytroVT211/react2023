"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  

  const linkClass = (href) => {
    const active = pathname === href;
    return [
      "inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
      active
        ? "text-white shadow-md bg-[color:var(--accent)]"
        : "text-[color:var(--foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
    ].join(" ");
  };

  return (
    <header className="w-full border-b border-muted mb-6 sticky top-0 bg-background/80 backdrop-blur z-10">
      <nav className="max-w-5xl mx-auto flex items-center gap-4 p-4">
        <Link href="/events" className={linkClass("/events")}>Events</Link>
        <Link href="/about" className={linkClass("/about")}>About</Link>
      </nav>
    </header>
  );
}
