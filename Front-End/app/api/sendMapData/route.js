import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { lat, lon, zoom, mapCorners } = await request.json();

  try {
    const response = await axios.post('http://localhost:5000/api/mapdata', {
      lat,
      lon,
      zoom,
      mapCorners
    });

    return NextResponse.json({ message: 'Data sent successfully', data: response.data });
  } catch (error) {
    return NextResponse.json({ message: 'Error sending data', error: error.message }, { status: 500 });
  }
}