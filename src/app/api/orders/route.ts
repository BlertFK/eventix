import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = (session.user as { id?: string }).id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const userId = (session.user as { id?: string }).id;

    const order = await Order.create({
      ...body,
      userId,
      status: "confirmed",
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
