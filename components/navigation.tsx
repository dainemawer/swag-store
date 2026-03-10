"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Search",
        href: "/search"
    }
];

function NavigationItem({ item, pathname }: { item: typeof navigationItems[0], pathname: string }) {
    return (
        <li key={item.href}>
            <Link className={cn(
                "font-medium text-sm text-zinc-600 hover:text-zinc-900",
                pathname === item.href &&
                "text-zinc-900 underline underline-offset-4"
            )} href={item.href}>{item.label}</Link>
        </li>
    )
}
export default function Navigation() {
    const pathname = usePathname()
    return (
        <nav>
            <ul className="flex items-center gap-4">
                {navigationItems.map((item) => (
                    <NavigationItem key={item.href} item={item} pathname={pathname} />
                ))}
            </ul >
        </nav >
    )
}
