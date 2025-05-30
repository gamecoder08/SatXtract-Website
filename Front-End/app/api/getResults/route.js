import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch results from the Flask backend
    const response = await fetch("http://127.0.0.1:5000/api/getResults", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch results from the backend");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { message: "Failed to fetch results", error: error.message },
      { status: 500 }
    );
  }
}