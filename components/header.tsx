import { Suspense } from "react";
import Cart from "./cart";
import Container from "./container";
import Logo from "./logo";
import Navigation from "./navigation";

export default function Header() {
    return (
        <header className="p-4 sticky border-b border-zinc-200 top-0 z-50 bg-white">
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
