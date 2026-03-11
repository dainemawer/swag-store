import { Suspense } from "react";
import Cart from "./cart";
import Container from "./container";
import Logo from "./logo";
import Navigation from "./navigation";

export default function Header() {
    return (
        <header className="sticky py-4 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <Container className="flex items-center justify-between">
                <Logo />
                <Suspense fallback={null}>
                    <Navigation />
                </Suspense>
                <Cart />
            </Container>
        </header>
    );
}
