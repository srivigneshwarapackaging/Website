"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Clock, MousePointer2 } from "lucide-react";
import { AdminPanel, AdminStatusDot } from "./AdminUI";

export function HeatmapWidget() {
  const [data, setData] = useState<
    { section: string; time?: number; heat?: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchHeatmap = async () => {
    try {
      const res = await fetch("/api/analytics?type=heatmap");
      const json = await res.json();
      if (Array.isArray(json)) setData(json);
    } catch (err) {
      console.error("Heatmap fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeatmap();
    const interval = setInterval(fetchHeatmap, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <AdminPanel className="flex h-full min-h-[280px] flex-col items-center justify-center p-10">
        <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-kraft" />
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
          Syncing heatmap…
        </p>
      </AdminPanel>
    );
  }

  return (
    <AdminPanel className="h-full p-8" glow="kraft">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
            <MousePointer2 size={18} className="text-kraft" />
            Engagement heatmap
          </h2>
          <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-stone-500">
            Section dwell time
          </p>
        </div>
        <AdminStatusDot live />
      </div>

      <div className="space-y-5">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.section} className="group">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">
                  {item.section}
                </span>
                <div className="flex items-center gap-1.5 text-stone-500">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold">{item.time}s avg</span>
                </div>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full border border-white/10 bg-charcoal/60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.heat}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      (item.heat ?? 0) > 50
                        ? "linear-gradient(90deg, #c4a574, #e8d5b7)"
                        : "linear-gradient(90deg, #44403c, #78716c)",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Activity size={32} className="mb-2 text-stone-700" />
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
              Waiting for scroll data…
            </p>
          </div>
        )}
      </div>
    </AdminPanel>
  );
}
