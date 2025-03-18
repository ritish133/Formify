"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return !path.includes('aiform') && (
    <div className='p-3 px-5 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <a href="/">
          <Image src={'/logo.png'} width={180} height={50} alt='logo' />
        </a>

        <div className='flex gap-5'>
          {/* AI Studio Button */}
          <a href="https://ai-studio-project.vercel.app/" rel="noopener noreferrer">
              <Button variant="outline">AI Studio</Button>
            </a>

            {isSignedIn ? (
          <div className='flex items-center gap-5'>
            <Link href={'/dashboard'}>
              <Button variant="outline">Dashboard</Button>  
            </Link>
            

            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
        </div>

        
      </div>
    </div>
  );
}

export default Header;