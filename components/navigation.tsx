"use client";

import { usePathname } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigationItems = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Search",
        href: "/search",
    },
];

export default function Navigation() {
    const pathname = usePathname();
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink data-active={pathname === item.href} href={item.href}>
                            {item.label}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
