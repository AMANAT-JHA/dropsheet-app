import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST() {
  try {
    const key_id =
      process.env.RAZORPAY_KEY_ID?.trim() ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ||
      "rzp_test_TgluXRA1Mirk5O";

    const key_secret =
      process.env.RAZORPAY_KEY_SECRET?.trim() ||
      "H57GHEssURGUNFBYFYoZiz4d";

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const order = await razorpay.orders.create({
      amount: 4900,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      order,
      keyId: key_id,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);

    // Return Razorpay's exact description if available
    const detailedMessage =
      error?.error?.description ||
      error?.message ||
      JSON.stringify(error) ||
      "Failed to create order";

    return NextResponse.json(
      { success: false, error: detailedMessage },
      { status: 500 }
    );
  }
}