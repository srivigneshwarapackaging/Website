"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Save, Trash2, Search, X, Download, Sparkles, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { DEFAULT_SITE_CONTENT, SiteContentData } from "@/shared/types/content-types";
import { AnalyticsWidget } from "@/components/admin/AnalyticsWidget";
import { HeatmapWidget } from "@/components/admin/HeatmapWidget";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";
import { AdminToastHost, showAdminToast } from "@/components/admin/AdminToast";
import {
  AdminBadge,
  AdminButton,
  AdminChip,
  AdminInput,
  AdminLoader,
  AdminPanel,
  AdminStatCard,
  adminPrimaryClass,
} from "@/components/admin/AdminUI";
import {
  HeroEditor,
  TrustBarEditor,
  AboutEditor,
  ProcessEditor,
  ProductsEditor,
  SustainabilityEditor,
  MarqueeEditor,
  ContactEditor,
  CompanyEditor,
  SiteSettingsEditor,
  SeoEditor,
} from "@/components/admin/ContentEditors";

const messagesFetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || !Array.isArray(data)) return [];
  return data;
};

const PREVIEW_ANCHORS: Record<string, string> = {
  hero: "/#hero",
  trust: "/",
  about: "/about",
  process: "/#process",
  products: "/#products",
  sustainability: "/#sustainability",
  marquee: "/",
  contact: "/#contact",
  company: "/",
  settings: "/",
  seo: "/",
};

const TABS = [
  { id: "analytics", label: "Analytics" },
  { id: "hero", label: "Hero" },
  { id: "trust", label: "Trust bar" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "products", label: "Products" },
  { id: "sustainability", label: "Eco" },
  { id: "marquee", label: "Marquee" },
  { id: "contact", label: "Contact" },
  { id: "company", label: "Company" },
  { id: "settings", label: "Site settings" },
  { id: "seo", label: "SEO" },
  { id: "messages", label: "Inquiries" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: messagesData, mutate: mutateMessages } = useSWR(
    status === "authenticated" ? "/api/admin/get-messages" : null,
    messagesFetcher
  );
  const messages = Array.isArray(messagesData) ? messagesData : [];

  const [activeTab, setActiveTab] = useState("analytics");
  const [timeRange, setTimeRange] = useState("weekly");
  const [visitorCount, setVisitorCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [siteData, setSiteData] = useState<SiteContentData>(DEFAULT_SITE_CONTENT);

  const filteredMessages = useMemo(
    () =>
      messages.filter(
        (m: { name?: string; email?: string; message?: string }) =>
          m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.message?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [messages, searchQuery]
  );

  const newMessagesCount = useMemo(
    () => messages.filter((m: { status?: string }) => m.status !== "resolved").length,
    [messages]
  );

  const loadData = useCallback(async () => {
    const [analyticsRes, contentRes] = await Promise.all([
      fetch(`/api/analytics?range=${timeRange}`),
      fetch("/api/admin/get-site"),
    ]);
    const [analyticsData, contentData] = await Promise.all([
      analyticsRes.json(),
      contentRes.json(),
    ]);
    if (Array.isArray(analyticsData)) {
      setVisitorCount(
        analyticsData.reduce((acc: number, curr: { views?: number }) => acc + (curr.views || 0), 0)
      );
    }
    if (contentData && !contentData.error) {
      setSiteData(contentData as SiteContentData);
    }
  }, [timeRange]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/admin");
    else if (status === "authenticated") loadData();
  }, [status, router, loadData]);

  const publish = async () => {
    setIsSaving(true);
    setValidationErrors({});
    try {
      const res = await fetch("/api/admin/update-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteData),
      });
      const data = await res.json();
      if (res.status === 422 && data.issues) {
        setValidationErrors(data.issues);
        showAdminToast("Fix validation errors before publishing", "error");
        return;
      }
      if (!res.ok) throw new Error(data.error || "Failed");
      showAdminToast("Site published successfully");
    } catch {
      showAdminToast("Publish failed", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const tabsWithBadges = TABS.map((tab) =>
    tab.id === "messages" && newMessagesCount > 0
      ? { ...tab, badge: newMessagesCount }
      : tab
  );

  const activeTabMeta = TABS.find((t) => t.id === activeTab);
  const previewHref = PREVIEW_ANCHORS[activeTab];

  if (status === "loading") return <AdminLoader />;
  if (!session) return null;

  const headerActions =
    activeTab === "analytics" ? (
      <div className="flex flex-wrap gap-2">
        {["weekly", "monthly", "yearly"].map((r) => (
          <AdminChip
            key={r}
            active={timeRange === r}
            onClick={() => {
              setTimeRange(r);
              loadData();
            }}
          >
            {r}
          </AdminChip>
        ))}
        <a href="/api/admin/export-analytics">
          <AdminButton variant="ghost">
            <Download size={14} /> Export
          </AdminButton>
        </a>
        <AdminButton
          variant="ghost"
          onClick={async () => {
            await fetch("/api/admin/cleanup-analytics");
            loadData();
          }}
        >
          <Sparkles size={14} /> Cleanup
        </AdminButton>
      </div>
    ) : previewHref && activeTab !== "messages" ? (
      <a href={previewHref} target="_blank" rel="noopener noreferrer">
        <AdminButton variant="ghost">
          <ExternalLink size={14} /> Preview section
        </AdminButton>
      </a>
    ) : undefined;

  const publishButton =
    activeTab !== "analytics" && activeTab !== "messages" ? (
      <button
        type="button"
        onClick={publish}
        disabled={isSaving}
        className={cn(
          "fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full px-8 py-4 font-bold transition-all active:scale-[0.98] disabled:opacity-50",
          adminPrimaryClass,
          "shadow-[0_20px_50px_-15px_rgba(196,165,116,0.45)]"
        )}
      >
        <Save size={18} /> {isSaving ? "Publishing…" : "Publish site"}
      </button>
    ) : undefined;

  const errorEntries = Object.entries(validationErrors);

  return (
    <>
      <AdminToastHost />
      <AdminDashboardShell
        companyName={siteData.company.name}
        userEmail={session.user?.email}
        tabs={tabsWithBadges}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={() => signOut({ callbackUrl: "/auth/admin" })}
        title={activeTabMeta?.label ?? activeTab}
        subtitle={session.user?.email ?? undefined}
        headerActions={headerActions}
        publishButton={publishButton}
      >
        {errorEntries.length > 0 && (
          <AdminPanel className="mb-6 border-red-500/30 bg-red-950/20 p-4">
            <p className="text-sm font-bold text-red-200">Validation errors</p>
            <ul className="mt-2 space-y-1 text-xs text-red-300/90">
              {errorEntries.map(([field, msgs]) =>
                (msgs || []).map((msg) => (
                  <li key={`${field}-${msg}`}>
                    <span className="font-mono text-red-400">{field}</span>: {msg}
                  </li>
                ))
              )}
            </ul>
          </AdminPanel>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <AdminStatCard label={`${timeRange} views`} value={visitorCount} accent />
              <div className="lg:col-span-2">
                <HeatmapWidget />
              </div>
            </div>
            <AnalyticsChart range={timeRange} />
            <AnalyticsWidget range={timeRange} />
          </div>
        )}

        {activeTab === "hero" && (
          <HeroEditor data={siteData.hero} onChange={(hero) => setSiteData({ ...siteData, hero })} />
        )}
        {activeTab === "trust" && (
          <TrustBarEditor
            data={siteData.trustBar}
            onChange={(trustBar) => setSiteData({ ...siteData, trustBar })}
          />
        )}
        {activeTab === "about" && (
          <AboutEditor data={siteData.about} onChange={(about) => setSiteData({ ...siteData, about })} />
        )}
        {activeTab === "process" && (
          <ProcessEditor
            data={siteData.process}
            onChange={(process) => setSiteData({ ...siteData, process })}
          />
        )}
        {activeTab === "products" && (
          <ProductsEditor
            data={siteData.products}
            onChange={(products) => setSiteData({ ...siteData, products })}
          />
        )}
        {activeTab === "sustainability" && (
          <SustainabilityEditor
            data={siteData.sustainability}
            onChange={(sustainability) => setSiteData({ ...siteData, sustainability })}
          />
        )}
        {activeTab === "marquee" && (
          <MarqueeEditor
            data={siteData.marqueeCta}
            onChange={(marqueeCta) => setSiteData({ ...siteData, marqueeCta })}
          />
        )}
        {activeTab === "contact" && (
          <ContactEditor
            data={siteData.contact}
            onChange={(contact) => setSiteData({ ...siteData, contact })}
          />
        )}
        {activeTab === "company" && (
          <CompanyEditor
            data={siteData.company}
            onChange={(company) => setSiteData({ ...siteData, company })}
          />
        )}
        {activeTab === "settings" && (
          <SiteSettingsEditor
            data={siteData.siteSettings}
            onChange={(siteSettings) => setSiteData({ ...siteData, siteSettings })}
          />
        )}
        {activeTab === "seo" && (
          <SeoEditor data={siteData.seo} onChange={(seo) => setSiteData({ ...siteData, seo })} />
        )}

        {activeTab === "messages" && (
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
                size={16}
              />
              <AdminInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inquiries…"
                className="pl-11 pr-10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {filteredMessages.length === 0 && (
              <AdminPanel className="p-10 text-center">
                <p className="text-sm text-stone-500">No inquiries found.</p>
              </AdminPanel>
            )}

            {filteredMessages.map(
              (m: {
                _id: string;
                name: string;
                email: string;
                message: string;
                ply?: string;
                attachmentName?: string;
                status?: string;
                date?: string;
              }) => (
                <AdminPanel key={m._id} className="p-6">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-lg font-bold">{m.name}</h4>
                      <p className="mt-1 text-sm text-kraft-light">{m.email}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {m.ply && (
                        <AdminBadge tone="kraft">
                          {m.ply === "diecut" ? "Die-cut" : `${m.ply}-ply`}
                        </AdminBadge>
                      )}
                      <AdminBadge tone={m.status === "resolved" ? "neutral" : "accent"}>
                        {m.status === "resolved" ? "Resolved" : "New"}
                      </AdminBadge>
                      <span className="text-xs text-stone-500">
                        {m.date ? new Date(m.date).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-stone-400">{m.message}</p>
                  {m.attachmentName && (
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Attachment: {m.attachmentName}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <AdminButton
                      variant="ghost"
                      onClick={async () => {
                        const s = m.status === "resolved" ? "new" : "resolved";
                        await fetch(`/api/admin/update-inquiry-status?id=${m._id}&status=${s}`, {
                          method: "PATCH",
                        });
                        mutateMessages();
                      }}
                    >
                      {m.status === "resolved" ? "Re-open" : "Resolve"}
                    </AdminButton>
                    <AdminButton
                      variant="danger"
                      onClick={async () => {
                        if (!confirm("Delete this inquiry?")) return;
                        await fetch(`/api/admin/delete-message?id=${m._id}`, { method: "DELETE" });
                        mutateMessages();
                      }}
                    >
                      <Trash2 size={14} />
                    </AdminButton>
                  </div>
                </AdminPanel>
              )
            )}
          </div>
        )}
      </AdminDashboardShell>
    </>
  );
}
