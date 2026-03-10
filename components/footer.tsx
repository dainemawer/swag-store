import Logo from "./logo";

export default function Footer() {
    return (
        <footer className="flex justify-between items-center p-4">
            <div className="container mx-auto max-w-7xl flex justify-start items-center gap-8">
                <Logo />
            </div>
        </footer>
    )
}
