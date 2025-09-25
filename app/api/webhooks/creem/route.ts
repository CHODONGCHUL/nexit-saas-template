import { NextRequest, NextResponse } from "next/server";
import {
  updateUserSubscriptionServer,
  updateUserCustomerIdServer,
} from "@/services/creem";

// 공통 구독 데이터 변환 함수
function buildSubscriptionData(data: any, subscription?: any) {
  const subData = subscription || data;
  const product = data.product;

  return {
    id: subData.id,
    status: subData.status || "completed",
    product_id: product?.id,
    product_name: product?.name,
    amount: product?.price,
    currency: product?.currency || "USD",
    interval: product?.billing_period || "one_time",
    current_period_start: subData.current_period_start_date || null,
    current_period_end: subData.current_period_end_date || null,
    canceled_at: subData.canceled_at || null,
    purchased_at: new Date().toISOString(),
  };
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Creem은 서명 검증을 제공하지 않음 → 그대로 body 파싱
    const body = await request.text();

    console.log("📩 Creem raw webhook body:", body);
    const webhookData = JSON.parse(body);

    const eventType =
      webhookData.eventType || webhookData.type || webhookData.event_type;
    const data = webhookData.object;

    if (!eventType || !data) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    const userId =
      data.metadata?.userId ||
      data.subscription?.metadata?.userId ||
      data.order?.metadata?.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in metadata" },
        { status: 400 }
      );
    }

    console.log(`📩 Verified webhook: ${eventType} for user ${userId}`);

    switch (eventType) {
      case "checkout.completed":
        if (data.subscription) {
          await updateUserSubscriptionServer(
            userId,
            buildSubscriptionData(data, data.subscription)
          );
          if (data.customer?.id) {
            await updateUserCustomerIdServer(userId, data.customer.id);
          }
        } else {
          await updateUserSubscriptionServer(userId, buildSubscriptionData(data));
        }
        break;

      case "subscription.active":
      case "subscription.paid":
      case "subscription.updated":
        await updateUserSubscriptionServer(userId, buildSubscriptionData(data));
        break;

      case "subscription.trialing":
        await updateUserSubscriptionServer(userId, {
          ...buildSubscriptionData(data),
          status: "trialing",
        });
        break;

      case "subscription.canceled":
        await updateUserSubscriptionServer(userId, {
          ...buildSubscriptionData(data),
          status: "canceled",
          canceled_at: data.canceled_at || new Date().toISOString(),
        });
        break;

      case "subscription.expired":
        await updateUserSubscriptionServer(userId, {
          ...buildSubscriptionData(data),
          status: "expired",
        });
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${eventType}`);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
