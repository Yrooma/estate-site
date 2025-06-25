'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [canListenForOutsideClick, setCanListenForOutsideClick] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMenuOpen && canListenForOutsideClick && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [canListenForOutsideClick, isMenuOpen]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <Image
              src="/icon-D-T.svg"
              alt="شعار ظافر أبو حربة العمري"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl ">مؤسسة أبو عمر العقارية</span>
          </Link>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                setCanListenForOutsideClick(false);
                setTimeout(() => setCanListenForOutsideClick(true), 100)
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
<div 
  ref={menuRef}
  className={`absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none ${isMenuOpen ? 'block' : 'hidden'} md:block`}
  onMouseDown={() => setCanListenForOutsideClick(false)}
>
  <div className="flex flex-col md:flex-row md:space-x-4 md:space-x-reverse">
    <Button 
      variant="ghost" 
      asChild 
      className="justify-start md:justify-center md:border-none border-b border-gray-100"
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href="/">الرئيسية</Link>
    </Button>
    <Button 
      variant="ghost" 
      asChild 
      className="justify-start md:justify-center md:border-none border-b border-gray-100"
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href="/about">من نحن</Link>
    </Button>
    <Button 
      variant="ghost" 
      asChild 
      className="justify-start md:justify-center md:border-none border-b border-gray-100"
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href="/services">خدماتنا</Link>
    </Button>
    <Button 
      variant="ghost" 
      asChild 
      className="justify-start md:justify-center md:border-none border-b border-gray-100"
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href="/properties">العقارات</Link>
    </Button>
    <Button 
      variant="ghost" 
      asChild 
      className="justify-start md:justify-center md:border-none border-b border-gray-100"
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href="/blog">الفوائد</Link>
    </Button>
    <Button 
      variant="ghost" 
      asChild 
      className="justify-start md:justify-center md:border-none"
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href="/contact">تواصل معنا</Link>
    </Button>
  </div>
</div>
        </div>
      </nav>
    </header>
  )
}
