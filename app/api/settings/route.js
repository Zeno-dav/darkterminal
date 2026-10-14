import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { Settings } from '@/models/Schema';

export async function GET() {
  await connectMongo();
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return NextResponse.json(settings);
}

export async function PUT(request) {
  await connectMongo();
  const data = await request.json();
  const updatedSettings = await Settings.findOneAndUpdate(
    {}, 
    { $set: data }, 
    { new: true, upsert: true }
  );
  return NextResponse.json(updatedSettings);
}
