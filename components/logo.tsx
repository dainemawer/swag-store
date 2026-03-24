import Link from "next/link";

export default function Logo({ title, width, height }: { title?: string | null, width?: number, height?: number }) {
    return (
        <Link rel="home" className="flex items-center gap-4 mr-6" href="/">
            <svg aria-hidden="true" role="img" focusable="false" height={height || 22} width={width || 22} aria-label="Vercel Logo" viewBox="0 0 74 64">
                <path fill="currentColor" d="m37.59.25 36.95 64H.64z" />
            </svg>

            {title && title.length > 0 && (
                <span className="font-bold">{title}</span>
            )}
        </Link>
    )
}
