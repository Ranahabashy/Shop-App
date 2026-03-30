import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        {
          message: "Failed to fetch product details from external API",
          status: response.status,
          error: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("PRODUCT DETAILS ROUTE ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal server error in /api/products/[id]",
      },
      { status: 500 }
    );
  }
}