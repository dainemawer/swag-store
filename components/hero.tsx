import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

export default function Hero() {
    return (
        <section className="bg-zinc-50 py-32">
            <Container className="space-y-6 justify-center flex gap-8">
                <figure>
                    <Logo width={200} height={200} />
                </figure>
                <div className="flex flex-col items-start justify-start gap-4">
                    <h1 className="text-6xl font-bold">
                        Wear the framework <br /> you ship with.
                    </h1>
                    <p className="text-zinc-500">
                        Premium swag for developers who build with Vercel. From tees
                        <br /> to tech gear, representthe tools you love.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/search">
                            Search Products
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
