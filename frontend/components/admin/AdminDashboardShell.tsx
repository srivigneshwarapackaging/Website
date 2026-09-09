"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Activity,
  BarChart3,
  Building2,
  ExternalLink,
  Info,
  Leaf,
  LogOut,
  Mail,
  MessageSquare,
  Package,
  Sparkles,
  Workflow,
} from "lucide-react";
import { GrainOverlay, AmbientGlow } from "@/components/design-system/PremiumEffects";
import { CorrugatedStripes, adminPrimaryClass } from "./AdminUI";

const TAB_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  analytics: BarChart3,
  hero: Sparkles,
  about: Info,
  process: Workflow,
  products: Package,
  sustainability: Leaf,
  contact: Mail,
  company: Building2,
  messages: MessageSquare,
};

export type AdminTab = {
  id: string;
  label: string;
  badge?: number;
};

export function AdminDashboardShell({
  companyName,
  userEmail,
  tabs,
  activeTab,
  onTabChange,
  onSignOut,
  title,
  subtitle,
  headerActions,
  publishButton,
  children,
}: {
  companyName: string;
  userEmail?: string | null;
  tabs: AdminTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onSignOut: () => void;
  title: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  publishButton?: React.ReactNode;
  children: React.ReactNode;
}) {
  const initials = companyName
    .split(/\s+/)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative min-h-screen bg-charcoal text-white">
      <GrainOverlay />
      <div className="relative flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="relative flex w-full shrink-0 flex-col border-b border-white/10 bg-charcoal-soft/90 backdrop-blur-xl lg:w-72 lg:border-b-0 lg:border-r">
          <CorrugatedStripes />
          <AmbientGlow className="left-0 top-0 h-48 w-48" color="kraft" />

          <div className="relative flex flex-col gap-6 p-6 lg:min-h-screen lg:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-kraft to-kraft-dark font-display text-sm font-bold italic text-charcoal shadow-lg ring-1 ring-white/10">
                {initials || "SVP"}
              </div>
              <div>
                <p className="font-display text-sm font-bold leading-tight">{companyName}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-500">
                  Operations portal
                </p>
              </div>
            </div>

            <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {tabs.map((tab) => {
                const Icon = TAB_ICONS[tab.id] ?? Activity;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`relative flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors lg:w-full ${
                      active ? "text-charcoal" : "text-stone-500 hover:text-stone-200"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="admin-tab-pill"
                        className={cn("absolute inset-0 rounded-xl shadow-lg shadow-kraft/20", adminPrimaryClass)}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon size={16} className="relative shrink-0" />
                    <span className="relative">{tab.label}</span>
                    {tab.badge ? (
                      <span className="relative ml-auto rounded-full bg-kraft px-1.5 py-0.5 text-[9px] font-black text-charcoal">
                        {tab.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:mt-auto lg:block">
              {userEmail && (
                <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-stone-600">
                    Signed in as
                  </p>
                  <p className="mt-1 truncate text-xs text-stone-300">{userEmail}</p>
                </div>
              )}

              <Link
                href="/"
                target="_blank"
                className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-kraft-light"
              >
                <ExternalLink size={12} />
                View live site
              </Link>

              <button
                type="button"
                onClick={onSignOut}
                className="flex items-center gap-2 text-sm font-bold text-stone-500 transition-colors hover:text-red-400"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="relative flex-1 overflow-y-auto">
          <AmbientGlow className="right-0 top-0 h-64 w-64" color="accent" />

          <div className="relative mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
            <header className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-kraft-light">
                  Dashboard
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold capitalize tracking-tight">
                  {title}
                </h1>
                {subtitle && <p className="mt-1 text-sm text-stone-500">{subtitle}</p>}
              </div>
              {headerActions}
            </header>

            {children}
          </div>

          {publishButton}
        </main>
      </div>
    </div>
  );
}
