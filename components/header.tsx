import Cart from "./cart";
import Logo from "./logo";
import Navigation from "./navigation";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4">
            <div className="container mx-auto max-w-7xl flex justify-start items-center gap-8">
                <Logo />
                <Navigation />
                <Cart />
            </div>
        </header>
    );
}
