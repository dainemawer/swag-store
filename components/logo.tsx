import Link from "next/link";

export default function Logo() {
    return (
        <Link rel="home" className="flex items-center gap-4 mr-6" href="/">
            <svg aria-hidden="true" role="img" focusable="false" height="22" aria-label="Vercel Logo" viewBox="0 0 74 64">
                <path fill="currentColor" d="m37.59.25 36.95 64H.64z" />
            </svg>
            <span className="font-bold">Vercel Swag Store</span>
        </Link>
    )
}
