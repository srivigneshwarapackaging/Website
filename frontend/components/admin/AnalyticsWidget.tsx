"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Layers } from "lucide-react";
import { AdminPanel, AdminStatCard } from "./AdminUI";

export function AnalyticsWidget({ range = "weekly" }: { range?: string }) {
  const [data, setData] = useState<
    { id: string; label: string; views: number; avgTime: number; reach: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics?type=heatmap")
      .then((r) => r.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setData(
            result.map((item: { section: string; views?: number; time?: number; heat?: number }) => ({
              id: item.section,
              label: item.section.charAt(0).toUpperCase() + item.section.slice(1),
              views: item.views || 0,
              avgTime: item.time || 0,
              reach: Math.round(item.heat ?? 0),
            }))
          );
        }
      })
      .finally(() => setLoading(false));
  }, [range]);

  if (loading) {
    return (
      <p className="py-8 text-center text-xs uppercase tracking-widest text-stone-500">
        Loading engagement…
      </p>
    );
  }

  const totalTime = data.reduce((a, b) => a + b.avgTime, 0);
  const avgEngagement = data.length ? Math.round(totalTime / data.length) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Avg section time"
          value={`${avgEngagement}s`}
          icon={<Clock size={16} />}
        />
        <AdminStatCard
          label="Sections tracked"
          value={String(data.length)}
          icon={<Layers size={16} />}
        />
        <AdminStatCard label="Range" value={range} icon={<Clock size={16} />} />
      </div>

      <AdminPanel className="p-6">
        <h3 className="mb-5 font-display text-lg font-bold">Section engagement</h3>
        <div className="space-y-4">
          {data.length ? (
            data.map((section, index) => (
              <div key={section.id} className="flex items-center gap-4">
                <span className="w-24 text-[10px] font-black uppercase tracking-widest text-stone-500">
                  {section.label}
                </span>
                <div className="relative h-10 flex-1 overflow-hidden rounded-xl border border-white/10 bg-charcoal/60">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${section.reach}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="h-full border-r-2 border-kraft bg-gradient-to-r from-kraft/40 to-kraft-light/30"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-white">
                    {section.reach}%
                  </span>
                </div>
                <span className="w-10 text-xs font-bold text-stone-500">{section.avgTime}s</span>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-stone-500">
              Browse the site to collect heatmap data.
            </p>
          )}
        </div>
      </AdminPanel>
    </div>
  );
}
