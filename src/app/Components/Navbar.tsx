"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RiAccountCircleLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import { useCartStore } from "@/store/cartStore";
import { urlFor } from "@/sanity/lib/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const [clientTotal, setClientTotal] = useState(0);
  const { items, totalPrice, getQuantity, removeItem } = useCartStore();

  useEffect(() => {
    setClientTotal(totalPrice()); // Set the correct price after mounting
  }, [totalPrice]);

  return (
    <nav className="relative z-50 max-w-[1440px] h-[80px] bg-[#FBEBB5] flex justify-between items-center px-6 shadow-md">
      {/* Mobile Menu Button */}
      <button className="text-2xl sm:hidden" onClick={() => setIsOpen(!isOpen)}>
        <TiThMenu />
      </button>

      <Link
        href="/"
        className="absolute left-1/2 transform -translate-x-1/2 sm:static sm:translate-x-0"
      >
        <Logo />
      </Link>
      {/* Navigation Links */}
      <div
        className={`absolute sm:static top-20 right-0 w-full sm:w-auto bg-[#FBEBB5] sm:flex sm:items-center sm:space-x-8 text-black text-lg font-medium z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {["/", "/Shop", "/About", "/Contact"].map((path) => (
          <Link
            key={path}
            href={path}
            className={`relative px-4 py-2 transition-all duration-200 hover:text-[#B88E2F] ${
              pathname === path
                ? "text-[#B88E2F] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#B88E2F]"
                : ""
            }`}
          >
            {path.replace("/", "") || "Home"}
          </Link>
        ))}
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-6 text-2xl ">
        <Link href="/Accounts">
          <RiAccountCircleLine className="cursor-pointer hover:text-[#B88E2F]" />
        </Link>
        <FiSearch className="cursor-pointer hover:text-[#B88E2F]" />
        <FaRegHeart className="cursor-pointer hover:text-[#B88E2F]" />
        <div className="relative">
          <IoCartOutline
            className="cursor-pointer hover:text-[#B88E2F]"
            onClick={() => setCartOpen(!cartOpen)}
          />

          {items.length > 0 && (
            <span className="absolute top-0 right-0 bg-[#B88E2F] text-white text-xs sm:text-sm font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center transform translate-x-2 -translate-y-1 sm:translate-x-3 sm:-translate-y-2">
              {items.length}
            </span>
          )}
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform transform ${cartOpen ? "translate-x-0" : "translate-x-full"} z-50 p-4`}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-xl">
            &times;
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <div className="w-20 h-20 flex justify-center items-center rounded-lg">
                <Image
                  src={urlFor(item.imageUrl).url() || "/"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md w-20 h-20 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold">{item.name}</h3>
                <div className="flex justify-between text-sm mt-1">
                  <span> {`${getQuantity(item._id)} × $${item.price}`}</span>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-600"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm font-medium mt-4">
          <span>Subtotal</span>
          <span className="text-[#B88E2F]">${clientTotal}</span>
        </div>

        <div className="flex space-x-4 mt-6">
          <Link href="/Cart">
            <button className=" p-2 border border-black rounded-full hover:bg-black hover:text-white">
              View Cart
            </button>
          </Link>
          <Link href="/CheckOut">
            <button className=" p-2 border border-black rounded-full hover:bg-black hover:text-white">
              Checkout
            </button>
          </Link>
        </div>
      </div>

      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setCartOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
