"use client"
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import { SignInButton, useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="h-[500px] bg-[url('/grid.svg')]">
      <div className="mx-auto max-w-screen-xl z-30 px-4 pt-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Create your Form
            <strong className="font-extrabold text-primary sm:block">
              {' '}
              In Seconds, Not in Hours{' '}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-500">
            Generate, publish, and share your form right away with AI. Download the responses in Excel format.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {isSignedIn ? (
              <Link href="/dashboard">
                <div className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-yellow-400 focus:outline-none focus:ring active:text-red-500 sm:w-auto">
                  Dashboard
                </div>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <a className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-yellow-400 focus:outline-none focus:ring active:text-red-500 sm:w-auto" href=''>
                  Get Started
                </a>
              </SignInButton>
            )}

<a
  className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-yellow-400 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
  href="#edit-section"
>
  Learn More
</a>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="How">
        <div className="mx-auto max-w-screen-xl px-4 py-56">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-white">How it Works</h2>

            <p className="mt-4 text-gray-300">
              Our platform leverages advanced AI technology to help you create forms effortlessly. 
              Simply provide a prompt, and our AI will generate a form tailored to your needs. 
              Customize the form to your liking and start collecting responses in no time.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              <AtomIcon className='h-8 w-8 text-white'/>
              <h2 className="mt-4 text-xl font-bold text-white">Write Prompt for Your Form</h2>
              <p className="mt-1 text-sm text-white">
                Start by writing a simple prompt describing the form you need. 
                Our AI will take care of the rest, generating a comprehensive form based on your input.
              </p>
            </div>

            <div id="edit-section" className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
  <Edit className='h-8 w-8 text-white'/>
  <h2 className="mt-4 text-xl font-bold text-white">Edit Your Form</h2>
  <p className="mt-1 text-sm text-white">
    Customize the generated form to suit your specific requirements. 
    Add, remove, or modify fields with ease to ensure the form meets your needs.
  </p>
</div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              <Share2 className='h-8 w-8 text-white' />
              <h2 className="mt-4 text-xl font-bold text-white">Share & Start Accepting Responses</h2>
              <p className="mt-1 text-sm text-white">
                Create AI-Generated Forms hassle-free. Our platform allows you to quickly generate 
                forms using AI, making the process seamless and efficient. Share your forms with ease 
                and start collecting responses instantly.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/sign-in"
              className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Hero;