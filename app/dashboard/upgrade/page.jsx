"use client";
import PricingPlan from "@/app/_data/PricingPlan";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

function Upgrade() {
    const { user } = useUser();
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    // Load Razorpay script dynamically
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);
    }, []);

    const handlePayment = (item) => {
        if (!razorpayLoaded) {
            alert("Razorpay SDK is not loaded. Please try again.");
            return;
        }
    
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Razorpay Key
            amount: item.price * 100, // Amount in paise
            currency: "INR",
            name: "Formify",
            description: `${item.duration} Plan`,
            image: "/logo.svg", // Replace with your logo URL
            handler: async function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
    
                try {
                    // Call API to update subscription in the database
                    const res = await fetch("/api/updateSubscription", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
                    });
    
                    const data = await res.json();
                    if (res.ok && data.success) {
                        console.log("Subscription updated successfully in the database.");
                        
                        // Store subscription status locally
                        localStorage.setItem("isSubscribed", "true");
    
                        // Reload the page to reflect unlimited form creation
                        window.location.reload();
                    } else {
                        console.error("Failed to update subscription:", data.error);
                        alert("Payment was successful, but there was an issue updating your subscription.");
                    }
                } catch (error) {
                    console.error("API error:", error);
                    alert("Payment was successful, but an error occurred while updating your subscription.");
                }
            },
            prefill: {
                email: user?.primaryEmailAddress?.emailAddress,
            },
            theme: {
                color: "#FBBF24",
            },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="p-10">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                    {PricingPlan.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12"
                        >
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-900">
                                    {item.duration}
                                    <span className="sr-only">Plan</span>
                                </h2>
                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                        Rs {item.price}
                                    </strong>
                                    <span className="text-sm font-medium text-gray-700">
                                        /{item.duration}
                                    </span>
                                </p>
                            </div>
                            <ul className="mt-6 space-y-2">
                                <li className="flex items-center gap-1">
                                    ✅ <span className="text-gray-700">Unlimited AI forms</span>
                                </li>
                                <li className="flex items-center gap-1">
                                    ✅ <span className="text-gray-700">Unlimited User Form Responses</span>
                                </li>
                                <li className="flex items-center gap-1">
                                    ✅ <span className="text-gray-700">Email support</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => handlePayment(item)}
                                className="mt-8 block rounded-full border border-yellow-500 bg-white px-12 py-3 text-center text-sm font-medium text-yellow-600 hover:ring-1 hover:ring-yellow-600 focus:outline-none focus:ring active:text-yellow-500"
                                disabled={!razorpayLoaded}
                            >
                                {razorpayLoaded ? "Get Started" : "Loading..."}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Upgrade;