import { NextResponse } from "next/server";
import { db } from "@/configs";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const payload = await req.json();
        
        // Extract user details from Clerk webhook payload
        const email = payload.data?.email_addresses?.[0]?.email_address;
        
        if (!email) {
            return NextResponse.json({ error: "Email not provided" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await db.select().from(Users).where(eq(Users.email, email));

        if (!existingUser.length) {
            // Insert new user if not found
            await db.insert(Users).values({
                email: email,
                isSubscribed: false
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error handling Clerk webhook:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}