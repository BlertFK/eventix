import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const userId = (session.user as { id?: string }).id;
    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    review.rating = body.rating ?? review.rating;
    review.comment = body.comment ?? review.comment;
    await review.save();

    return NextResponse.json({ review });
  } catch {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const userId = (session.user as { id?: string }).id;
    const userRole = (session.user as { role?: string }).role;
    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.userId !== userId && userRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Review.findByIdAndDelete(id);
    return NextResponse.json({ message: "Review deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
