"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModal";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { desc, eq } from "drizzle-orm";

const PROMPT =
    ", On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle, FieldType, Placeholder, label, required fields, and checkbox and select field type options will be in array only and in JSON format";

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const route = useRouter();
    const [formList, setFormList] = useState([]);

    useEffect(() => {
        if (user) {
            GetFormList();
        }
    }, [user]);

    const GetFormList = useCallback(async () => {
        try {
            const result = await db
                .select()
                .from(JsonForms)
                .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(JsonForms.id));
            setFormList(result);
        } catch (error) {
            console.error("Error fetching forms:", error);
            toast.error("Failed to fetch form list.");
        }
    }, [user]);


    const ensureUserExists = useCallback(async () => {
        if (!user) return;
    
        try {
            const res = await fetch("/api/ensureUser", {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "User registration failed");
            }
        } catch (error) {
            console.error("Error ensuring user exists:", error);
        }
    }, [user]);
    
    useEffect(() => {
        ensureUserExists();
    }, [user]);

    const onCreateForm = useCallback(async () => {
        if (!user) return;
        
        setLoading(true);
        try {
            const res = await fetch("/api/upgradeSubscription", {  
                method: "POST",  // ✅ Ensure it's POST
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Subscription API request failed");
            }
    
            const data = await res.json();
            if (!data.success) {
                toast('Upgrade to create unlimited forms');
                setLoading(false);
                return;
            }
    
            // Continue with form creation
            const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
            const responseText = await result.response.text();
    
            try {
                const jsonForm = JSON.parse(responseText);
                const resp = await db.insert(JsonForms)
                    .values({
                        jsonform: JSON.stringify(jsonForm),
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('YYYY-MM-DD')
                    }).returning({ id: JsonForms.id });
    
                if (resp[0]?.id) {
                    route.push('/edit-form/' + resp[0].id);
                }
            } catch (jsonError) {
                console.error("Invalid JSON from AI:", jsonError);
                toast("Failed to generate form. Please try again.");
            }
        } catch (error) {
            console.error("Error creating form:", error);
            toast(error.message || "Something went wrong. Please try again.");
        }
        setLoading(false);
    }, [userInput, user, formList, route]);

    return (
        <div>
            <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new form</DialogTitle>
                    </DialogHeader>

                    <Textarea
                        className="my-2"
                        onChange={(event) => setUserInput(event.target.value)}
                        placeholder="Write description of your form"
                        disabled={loading}
                    />

                    <div className="flex gap-2 my-3 justify-end">
                        <Button onClick={() => setOpenDialog(false)} variant="destructive">
                            Cancel
                        </Button>
                        <Button disabled={loading} onClick={onCreateForm}>
                            {loading ? <Loader2 className="animate-spin" /> : "Create"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateForm;