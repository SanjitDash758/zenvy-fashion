import { NextRequest, NextResponse } from "next/server";
import { getSession, verifyUserPassword, updateUserPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "সব ফিল্ড পূরণ করুন" },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না" },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" },
        { status: 400 },
      );
    }

    // Verify current password
    const isValid = await verifyUserPassword(session.userId, currentPassword);
    if (!isValid) {
      return NextResponse.json(
        { error: "বর্তমান পাসওয়ার্ড ভুল" },
        { status: 401 },
      );
    }

    // Update password
    const updated = await updateUserPassword(session.userId, newPassword);
    if (!updated) {
      return NextResponse.json(
        { error: "পাসওয়ার্ড আপডেট ব্যর্থ হয়েছে" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "সার্ভারে সমস্যা" }, { status: 500 });
  }
}
