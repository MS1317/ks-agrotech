'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LOGO_SRC, LOGO_ALT, SITE_NAME } from '../../lib/constants';
import React from 'react';

const [firstPart, ...rest] = SITE_NAME.split(" ");
const secondPart = rest.join(" ");

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-3 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-center md:justify-start">
          <div className="flex items-center space-x-4">
            <Image
              src={LOGO_SRC}
              alt={LOGO_ALT}
              width={50}
              height={50}
              className="h-12 w-auto bg-white rounded-full p-1"
            />
            <div>
              <h1 className="text-xl font-bold tracking-wider">
                 <span className="text-blue-500">{firstPart}</span> <span className="text-white">{secondPart}</span>
              </h1>
              <p className="text-sm text-gray-300 hidden md:block">Mfrs and Exporter of V Belt Pulley and Agriculture Pulley Related to Machinery</p>
            </div>
          </div>
          <p className="text-xs text-gray-300 md:hidden text-center mt-2">Mfrs and Exporter of V Belt Pulley and Agriculture Pulley Related to Machinery</p>
        </div>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="w-full max-w-7xl mx-auto flex items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            {/* The brand logo can be hidden since it's in the top banner, or kept. We'll keep a small text version */}
            <Link href="/" className="-m-1.5 p-1.5 flex items-center cursor-pointer">
              <span className="ml-2 text-xl font-bold text-blue-700">{firstPart} <span className="text-gray-900">{secondPart}</span></span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/products" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors">
              Products
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </nav>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center cursor-pointer">
                <Image
                  src={LOGO_SRC}
                  alt={LOGO_ALT}
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-lg font-bold text-blue-700">{firstPart} <span className="text-gray-900">{secondPart}</span></span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-gray-900 hover:bg-gray-50"
                  >
                    About
                  </Link>
                  <Link
                    href="/products"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-gray-900 hover:bg-gray-50"
                  >
                    Products
                  </Link>
                  <Link
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  )
}