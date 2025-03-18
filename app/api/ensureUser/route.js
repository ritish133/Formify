import { NextResponse } from "next/server";
import { db } from "@/configs";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { email } = await req.json();

        console.log("Received email:", email); // Debugging log

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if the user exists
        const existingUser = await db.select().from(Users).where(eq(Users.email, email));
        
        console.log("Existing user:", existingUser); // Debugging log

        if (!existingUser.length) {
            // Insert new user if not found
            await db.insert(Users).values({
                email: email,
                isSubscribed: false
            });
            console.log("User inserted into database.");
        } else {
            console.log("User already exists.");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error ensuring user exists:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}