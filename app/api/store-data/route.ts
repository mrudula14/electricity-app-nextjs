// app/api/store-data/route.ts

import { NextRequest, NextResponse } from 'next/server';

let storedData: any[] = [];  // Simple in-memory storage, replace with a database in production

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    storedData.push(data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process data' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, data: storedData });
}
