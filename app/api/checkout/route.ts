import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, email, successUrl, metadata } = body;

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    // Creem Checkout API 호출
    const response = await fetch(`${process.env.CREEM_BASE_URL}/v1/checkouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ✅ Authorization 방식으로 교체
        "Authorization": `Bearer ${process.env.CREEM_API_KEY}`,
      },
      body: JSON.stringify({
        product_id: productId,
        customer: { email },
        success_url:
          successUrl ||
          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        metadata,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Creem API error full response:", data);
      return NextResponse.json({ error: data }, { status: response.status });
    }

    // ✅ Creem은 checkout_url 반환
    return NextResponse.json({ url: data.checkout_url });
  } catch (error: any) {
    console.error("❌ Checkout API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
