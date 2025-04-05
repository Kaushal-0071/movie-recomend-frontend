'use client';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Search, Heart, UserCircle, Brain } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link href="/Home" className="flex items-center space-x-2">
          <span className="text-xl font-bold">RecoSystem</span>
        </Link>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-2">
            <NavigationMenuItem>
              <Link href="/likes" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  "space-x-1"
                )}>
                  <Heart className="h-4 w-4" />
                  <span>Likes</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/hybrid" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  "space-x-1"
                )}>
                  <UserCircle className="h-4 w-4" />
                  <span>Personal</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/rag" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  "space-x-1"
                )}>
                  <Brain className="h-4 w-4" />
                  <span>RAG</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/search" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  "space-x-1"
                )}>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu - You might want to implement a proper mobile menu later */}
        <div className="md:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[200px] p-2 space-y-2">
                    <Link href="/likes" className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
                      <Heart className="h-4 w-4" />
                      <span>Likes</span>
                    </Link>
                    <Link href="/personal-recommendations" className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
                      <UserCircle className="h-4 w-4" />
                      <span>Personal</span>
                    </Link>
                    <Link href="/rag-recommendations" className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
                      <Brain className="h-4 w-4" />
                      <span>RAG</span>
                    </Link>
                    <Link href="/search" className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
                      <Search className="h-4 w-4" />
                      <span>Search</span>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}