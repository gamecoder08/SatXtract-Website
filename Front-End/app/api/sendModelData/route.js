import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { model } = await request.json(); // Extract the model from the request body

  try {
    // Forward the model data to the backend server
    const response = await axios.post('http://localhost:5000/api/selectModel', {
      model,
    });

    console.log('Response from Flask backend:', response.data);
    return NextResponse.json({
      message: 'Model sent successfully',
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error sending model data', error: error.message },
      { status: 500 }
    );
  }
}