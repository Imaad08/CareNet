'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";  

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const { isSignedIn } = useUser();  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);  

  return (
    <header className={`sticky top-0 z-50 px-4 lg:px-6 h-14 flex items-center justify-between bg-white transition-shadow duration-300 ${hasShadow ? 'shadow-md' : ''}`}>
      <Link className="flex items-center justify-center" href="/">
        <Heart className="h-6 w-6 text-primary" />
        <span className="ml-2 text-2xl font-bold text-primary">CareNet</span>
      </Link>
      <div className="lg:hidden">
        <Button variant="ghost" size="sm" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:gap-4 sm:gap-6 absolute lg:static top-14 left-0 w-full lg:w-auto bg-white lg:bg-transparent transition-all duration-300 ease-in-out ${isMenuOpen && hasShadow ? 'shadow-md' : ''}`}
      >
        <Link className="block lg:inline-block text-sm font-medium hover:underline underline-offset-4 p-4 lg:p-0" href="/guide">
          Guide
        </Link>
        <Link className="block lg:inline-block text-sm font-medium hover:underline underline-offset-4 p-4 lg:p-0" href="/caregivers">
          Caregivers
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center p-4 lg:p-0">
            <LogIn className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        {isSignedIn && (
          <div className="lg:hidden p-4">
            <UserButton />
          </div>
        )}
      </nav>
      {isSignedIn && (
        <div className="hidden lg:block">
          <UserButton />
        </div>
      )}
    </header>
  );
}
