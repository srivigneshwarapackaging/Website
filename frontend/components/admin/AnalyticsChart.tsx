"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import { AdminPanel } from "./AdminUI";

export function AnalyticsChart({ range }: { range: string }) {
  const [data, setData] = useState<{ label: string; views: number }[]>([]);

  useEffect(() => {
    fetch(`/api/analytics?range=${range}`)
      .then((r) => r.json())
      .then((rows) => {
        if (!Array.isArray(rows)) return;
        const mapped = rows.map((row: { timestamp?: string; views?: number }, i: number) => ({
          label: row.timestamp ? format(new Date(row.timestamp), "MMM d") : `#${i + 1}`,
          views: row.views || 1,
        }));
        setData(mapped.slice(-14));
      });
  }, [range]);

  if (!data.length) {
    return (
      <AdminPanel className="border-dashed p-10 text-center">
        <p className="text-sm text-stone-500">No page view data for this period yet.</p>
      </AdminPanel>
    );
  }

  return (
    <AdminPanel className="p-6">
      <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-stone-500">
        Traffic overview · {range}
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#78716c" }} axisLine={false} />
            <YAxis
              tick={{ fontSize: 10, fill: "#78716c" }}
              allowDecimals={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#1c1917",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fafaf9",
              }}
            />
            <Bar dataKey="views" fill="#c4a574" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AdminPanel>
  );
}
