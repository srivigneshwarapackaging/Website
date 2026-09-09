import { NextResponse } from 'next/server';
import { connectDB } from '@/backend/db/connection';
import Analytics from '@/backend/models/Analytics';
import { startOfWeek, startOfMonth, startOfYear } from 'date-fns';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const range = searchParams.get('range') || 'weekly';

    // HANDLE HEATMAP DATA
    if (type === 'heatmap') {
      const heatmapData = await Analytics.find({ category: 'heatmap' });
      const heatmapArray = heatmapData.map(item => {
        const avgTime = Number(item.value) || 0;
        // Calculate heat %: 60 seconds or more = 100% heat
        const heatPercentage = Math.min(100, Math.round((avgTime / 60) * 100));
        
        return {
          section: item.metricName,
          time: avgTime,
          heat: heatPercentage
        };
      });
      return NextResponse.json(heatmapArray);
    }

    // HANDLE CHART DATA (Page Views)
    let startDate;
    const now = new Date();
    
    if (range === 'yearly') startDate = startOfYear(now);
    else if (range === 'monthly') startDate = startOfMonth(now);
    else startDate = startOfWeek(now, { weekStartsOn: 1 });

    const chartData = await Analytics.find({ 
      category: 'charts',
      metricName: 'page_view',
      timestamp: { $gte: startDate }
    }).sort({ timestamp: 1 });
    
    return NextResponse.json(chartData || []);
  } catch (error) {
    console.error("GET Analytics Error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { eventType, sectionId, duration } = body;

    // 1. Record Page View
    if (eventType === 'page_view') {
      await Analytics.create({
        category: 'charts',
        metricName: 'page_view',
        views: 1,
        timestamp: new Date()
      });
      return NextResponse.json({ success: true });
    }

    // 2. Record Section Engagement (Heatmap)
    if (eventType === 'section_engagement' && sectionId && duration) {
      const id = sectionId.toLowerCase();
      
      // Update existing section or create new one
      const current = await Analytics.findOne({ category: 'heatmap', metricName: id });
      
      if (current) {
        // Simple moving average: (Previous Avg + New Duration) / 2
        const prevValue = Number(current.value) || 0;
        const newAvg = Math.round((prevValue + duration) / 2);
        
        await Analytics.updateOne(
          { _id: current._id },
          { 
            value: newAvg.toString(), 
            $inc: { views: 1 }, 
            timestamp: new Date() 
          }
        );
      } else {
        await Analytics.create({
          category: 'heatmap',
          metricName: id,
          value: duration.toString(),
          views: 1,
          timestamp: new Date()
        });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid Event' }, { status: 400 });
  } catch (error) {
    console.error("POST Analytics Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}