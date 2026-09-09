// lib/admin-analytics.ts
// This utility fetches data for the dashboard

export async function getAnalyticsSummary() {
  // In a real app, you would query your DB here (Prisma/Supabase)
  // For now, we return the structure required for the custom view
  return [
    { id: 'hero', label: 'Hero', views: 1200, avgTime: 5, reach: 100 },
    { id: 'products', label: 'Products', views: 950, avgTime: 18, reach: 79 },
    { id: 'process', label: 'Process', views: 600, avgTime: 45, reach: 50 },
    { id: 'eco', label: 'Sustainability', views: 400, avgTime: 12, reach: 33 },
    { id: 'contact', label: 'Contact', views: 250, avgTime: 30, reach: 20 },
  ];
}