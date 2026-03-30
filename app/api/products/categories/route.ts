import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://dummyjson.com/products/category-list", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          message: "Failed to fetch categories",
          status: response.status,
          error: errorText,
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("CATEGORIES API ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error in /api/products/categories" },
      { status: 500 }
    );
  }
}