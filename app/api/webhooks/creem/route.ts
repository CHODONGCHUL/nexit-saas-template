import { NextRequest, NextResponse } from "next/server";
import {
  updateUserSubscriptionServer,
  updateUserCustomerIdServer,
} from "@/services/creem";
import * as crypto from "crypto";

// 공통 구독 데이터 변환 함수
function buildSubscriptionData(data: any, subscription?: any) {
  const subData = subscription || data;
  const product = data.product;

  return {
    id: subData.id,
    status: subData.status,
    product_id: product?.id,
    product_name: product?.name,
    amount: product?.price,
    currency: product?.currency || "USD",
    interval: product?.billing_period,
    current_period_start: subData.current_period_start_date,
    current_period_end: subData.current_period_end_date,
    canceled_at: subData.canceled_at,
  };
}

export async function POST(request: NextRequest) {
  try {
    // 웹훅 시그니처 검증
    const body = await request.text();
    const signature = request.headers.get("creem-signature");
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("CREEM_WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    if (signature) {
      const computedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex");

      if (signature !== computedSignature) {
        console.error("Invalid webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    const webhookData = JSON.parse(body);
    const { eventType, object: data } = webhookData;

    // 메타데이터에서 userId 추출
    let userId =
      data.metadata?.userId ||
      data.subscription?.metadata?.userId ||
      data.order?.metadata?.userId;

    if (!userId) {
      console.error("User ID not found in webhook metadata");
      return NextResponse.json(
        { error: "User ID not found in metadata" },
        { status: 400 }
      );
    }

    // 이벤트 타입에 따른 처리
    switch (eventType) {
      case "checkout.completed":
        if (data.subscription) {
          // 구독 정보 업데이트
          await updateUserSubscriptionServer(
            userId,
            buildSubscriptionData(data, data.subscription)
          );

          // Customer ID 업데이트 (처음 결제 시)
          if (data.customer?.id) {
            await updateUserCustomerIdServer(userId, data.customer.id);
          }
        }
        break;

      case "subscription.active":
      case "subscription.paid":
      case "subscription.update":
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
        // 처리되지 않은 웹훅 이벤트
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
