import { NextResponse } from "next/server";
import { db } from "@/configs";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Find the user
        const user = await db.select().from(Users).where(eq(Users.email, email));

        if (!user.length) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update subscription
        await db.update(Users).set({ isSubscribed: true }).where(eq(Users.email, email));

        return NextResponse.json({ success: true, message: "Subscription updated successfully" });
    } catch (error) {
        console.error("Error updating subscription:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}