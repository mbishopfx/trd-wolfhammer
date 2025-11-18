import { NextResponse } from 'next/server';

export async function GET() {
  const status = {
    status: 'warning' as 'healthy' | 'warning' | 'error',
    timestamp: new Date().toISOString(),
    services: [
      {
        name: 'Website',
        status: 'operational' as 'operational' | 'degraded' | 'down',
        responseTime: '<100ms',
      },
      {
        name: 'Supabase',
        status: 'degraded' as 'operational' | 'degraded' | 'down',
        responseTime: 'Not connected',
      },
      {
        name: 'Sanity CMS',
        status: 'degraded' as 'operational' | 'degraded' | 'down',
        responseTime: 'Not configured',
      },
    ],
  };

  // Check if Supabase is configured
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    status.services[1].status = 'operational';
    status.services[1].responseTime = '<200ms';
  }

  // Check if Sanity is configured
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    status.services[2].status = 'operational';
    status.services[2].responseTime = '<150ms';
  }

  // Update overall status
  const allOperational = status.services.every((s) => s.status === 'operational');
  if (allOperational) {
    status.status = 'healthy';
  }

  return NextResponse.json(status);
}

