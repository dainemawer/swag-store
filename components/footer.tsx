import Link from "next/link";
import Container from "./container";

async function getYear() {
    "use cache";

    return new Date().getFullYear();
}

export default async function Footer() {
    const year = await getYear();

    return (
        <footer className="flex border-t border-zinc-200 justify-between items-center py-6 p-4 mt-20">
            <Container>
                <p className="text-sm text-zinc-500">
                    &copy; {year} <Link className="hover:underline text-black underline-offset-4" href="/">Vercel Swag Store</Link>. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}
