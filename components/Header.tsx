"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";

function Header() {
  const { user } = useUser();
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div>
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          Shopr
        </Link>
      </div>

      <Form
        action={"/search"}
        className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
      >
        <input
          type="text"
          name="query"
          placeholder="Search for products..."
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
        />
      </Form>

      <div>
        <Link
          href={"/basket"}
          className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
        >
          <TrolleyIcon className="w-6 h-6" />
          <span>My Basket</span>
        </Link>
      </div>

      <ClerkLoaded>
        {user && (
          <Link
            href={"/orders"}
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
          >
            <PackageIcon className="w-6 h-6" />
            <span>My Orders</span>
          </Link>
        )}
        {user ? (
          <div className="flex items-center space-x-2">
            <UserButton />
            <div className="hidden sm:block text-xs">
              <p className="text-gray-500">Welcome back</p>
              <p className="font-bold">{user.fullName}!</p>
            </div>
          </div>
        ) : (
          <SignInButton mode="modal" />
        )}
      </ClerkLoaded>
    </header>
  );
}
export default Header;