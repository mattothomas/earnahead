"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, BarChart3, Users, LayoutDashboard } from "lucide-react";

export default function FigmaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Concept has its own independent layout — don't double-wrap
  if (pathname.startsWith("/figma/concept")) {
    return <>{children}</>;
  }

  return (
    <div className="figma-theme min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-50" style={{ borderColor: '#E2E8F0' }}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/figma" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: '#0A1628' }}>
                <Heart className="w-5 h-5" style={{ color: 'white' }} fill="white" />
              </div>
              <span className="text-xl font-semibold" style={{ color: '#0A1628' }}>HealthContribute</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/figma/dashboard" className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#64748B', textDecoration: 'none' }}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link href="/figma/impact" className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#64748B', textDecoration: 'none' }}>
                <BarChart3 className="w-4 h-4" /> Impact
              </Link>
              <Link href="/figma/stories" className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#64748B', textDecoration: 'none' }}>
                <Users className="w-4 h-4" /> Stories
              </Link>
              <Link href="/" className="text-xs px-3 py-1.5 rounded" style={{ background: '#F5F7F9', color: '#64748B', textDecoration: 'none' }}>
                ← Picker
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t mt-24" style={{ borderColor: '#E2E8F0', background: '#F5F7F9' }}>
        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm" style={{ color: '#64748B' }}>
          © 2026 HealthContribute. All opportunities verified by licensed medical providers.
        </div>
      </footer>
    </div>
  );
}
