import { AlertCircle } from "lucide-react";
import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <Container>
            <div className="flex flex-col gap-4 items-start">
                <h1 className="text-2xl flex gap-2 items-center font-bold">
                    <AlertCircle className="w-6 h-6" />
                    404 - Not Found
                </h1>
                <p>The page you are looking for does not exist.</p>
                <Button variant="outline" size="lg" asChild>
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
        </Container>
    );
}
