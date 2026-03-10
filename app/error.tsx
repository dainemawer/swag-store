"use client";

import { AlertCircle } from "lucide-react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <Container>
            <div className="flex flex-col gap-4 items-start">
                <h1 className="text-2xl flex gap-2 items-center font-bold">
                    <AlertCircle className="w-6 h-6" />
                    Error! Oh no, something went wrong.
                </h1>
                <p>The server encountered an error.</p>
                {process.env.NODE_ENV === "development" && (
                    <pre className="text-sm text-red-500">{error.message}</pre>
                )}
                <Button variant="outline" size="lg" onClick={reset}>
                    Try Again
                </Button>
            </div>
        </Container>
    );
}
