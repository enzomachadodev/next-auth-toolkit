"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

const navItems = [
  { label: "Server", href: "/server" },
  { label: "Client", href: "/client" },
  { label: "Admin", href: "/admin" },
  { label: "Settings", href: "/settings" },
];

export const NavBar = () => {
  const pathname = usePathname();

  const renderNavItem = (item: { label: string; href: string }) => (
    <Button
      key={item.href}
      asChild
      variant={pathname === item.href ? "default" : "outline"}
    >
      <Link href={item.href}>{item.label}</Link>
    </Button>
  );

  return (
    <nav className="flex w-full max-w-[600px] items-center justify-between rounded-xl bg-background p-4 shadow-sm">
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="text-xl outline-none"
            aria-label="Open Menu"
            asChild
          >
            <Button className="text-sm">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            {navItems.map((item) => (
              <DropdownMenuItem asChild key={item.href} role="menuitem">
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden gap-x-2 md:flex">
        {navItems.map((item) => renderNavItem(item))}
      </div>
      <UserButton />
    </nav>
  );
};
