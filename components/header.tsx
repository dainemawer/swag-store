import { Suspense } from "react";
import Cart, { CartPopoverFallback } from "./cart";
import Container from "./container";
import Logo from "./logo";
import Navigation from "./navigation";

export default function Header() {
    return (
        <header className="sticky py-4 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <Container className="flex items-center justify-between">
                <Logo title="Swag Store" />
                <Suspense fallback={null}>
                    <Navigation />
                </Suspense>
                <div className="relative ml-auto inline-flex items-center">
                    <Suspense fallback={<CartPopoverFallback />}>
                        <Cart />
                    </Suspense>
                </div>
            </Container>
        </header>
    );
}
