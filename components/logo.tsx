import Link from "next/link";

export default function Logo() {
    return (
        <Link rel="home" className="flex items-center gap-4" href="/">
            <svg height="22" aria-label="My logo" viewBox="0 0 74 64">
                <title>Vercel Logomark</title>
                <path fill="currentColor" d="m37.59.25 36.95 64H.64z" />
            </svg>
            <span className="font-bold">Swag Store</span>
        </Link>
    )
}
