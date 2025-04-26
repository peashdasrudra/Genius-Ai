"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"; // ✅ Fixed import for Link
import { chatSession } from "@/utils/AiModel";
import { AIOutput } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment"; // ✅ Imported moment.js
import { Result } from "postcss";

function CreateNewContent() {
    const params = useParams(); // ✅ Unwrap params
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { user } = useUser();

    const SelectedTemplate: TEMPLATE | undefined = Templates?.find(
        (item) => item.slug === params["template-slug"] // ✅ Use unwrapped params
    );

    const GenerateAIContent = async (formData: any) => {
        setLoading(true);
        try {
            const SelectedPrompt = SelectedTemplate?.aiPrompt || "";
            const FinalAIPrompt = JSON.stringify(formData) + SelectedPrompt;

            const result = await chatSession.sendMessage(FinalAIPrompt);
            const responseText = await result.response.text(); // ✅ Await the text() method

            console.log("AI Output Received:", responseText);
            setAiOutput(responseText);

            await SaveInDb(JSON.stringify(formData), SelectedTemplate?.slug, responseText); // ✅ Fixed function call

        } catch (error) {
            console.error("Error generating AI content:", error);
        }
        setLoading(false);
    };

    const SaveInDb = async (formData: any, slug: any, aiResp: string | undefined) => {
        await db.insert(AIOutput).values({
            formData: formData || "", // Ensure it's a string
            templateSlug: slug || "", // Default to empty string if undefined
            aiResponse: aiResp || "", // Default to empty string if undefined
            createdBy: user?.primaryEmailAddress?.emailAddress || "", // Ensure it's always a string
            createdAt: moment().format('DD/MM/yyyy'),
        });
    };

    console.log(Result);

    return (
        <div className="p-10">
            <Link href="/">
                <Button>
                    <ArrowLeft /> Back
                </Button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
                {/* Form Section */}
                <FormSection SelectedTemplate={SelectedTemplate} userFormInput={GenerateAIContent} loading={loading} />

                {/* Output Section */}
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    );
}

export default CreateNewContent;
