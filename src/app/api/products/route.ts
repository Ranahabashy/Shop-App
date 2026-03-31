import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://dummyjson.com/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const limit = searchParams.get("limit") || "12";
    const skip = searchParams.get("skip") || "0";

    let url = BASE_URL;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          message: "Failed to fetch products from external API",
          status: response.status,
          error: errorText,
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("PRODUCTS API ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal server error in /api/products",
      },
      { status: 500 }
    );
  }
}