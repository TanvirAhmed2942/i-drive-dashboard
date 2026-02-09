"use client";

import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const documents = [
    { id: "terms-and-conditions", title: "Terms & Conditions", lastUpdated: "Jan 15, 2025" },
    { id: "privacy-policy", title: "Privacy Policy", lastUpdated: "Jan 15, 2025" },
    { id: "about-us", title: "About Us", lastUpdated: "Jan 15, 2025" },
    { id: "faqs", title: "FAQ's", lastUpdated: "Jan 15, 2025" },
];

export default function LegalLayout() {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Legal"
                description="Manage your legal documents and their information."
            />
            <Card className="overflow-hidden rounded-lg border border-white/10 bg-[#10162B]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-white">
                        Legal Documents
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                <FileText className="size-5 shrink-0 text-blue-400" />
                                <div className="min-w-0">
                                    <p className="font-semibold text-white">{doc.title}</p>
                                    <p className="text-sm text-zinc-500">
                                        Last updated: {doc.lastUpdated}
                                    </p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                className="shrink-0 bg-blue-600 hover:bg-blue-700"
                                onClick={() => router.push(`/dashboard/legal/${doc.id}`)}
                            >
                                View
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
