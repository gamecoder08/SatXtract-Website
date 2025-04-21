import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { lat, lon, zoom } = await request.json();

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${apiUrl}/api/mapdata`, 
    {
      lat,
      lon,
      zoom,
    });

    return NextResponse.json({ message: 'Data sent successfully', data: response.data });
  }
  catch (error) {
    return NextResponse.json({ message: 'Error sending data', error: error.message }, { status: 500 });
  }
}