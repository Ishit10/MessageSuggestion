"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 shadow-lg">
      <a href="#" className="text-xl font-bold text-white hover:text-gray-200 transition-colors">
        My Message
      </a>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-white text-sm">Welcome, {user?.username || user?.email}</span>
            <Button
              onClick={() => signOut()}
              className="bg-white text-indigo-600 font-medium px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors shadow"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="bg-white text-indigo-600 font-medium px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors shadow">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
