'use client'

import { useState } from 'react'
// import styles from './header.module.css'; 
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
import Image from 'next/image';
import Link from 'next/link';
import { LOGO_SRC, LOGO_ALT, SITE_NAME } from '../../lib/constants';
import React from 'react';

const [firstPart, ...rest] = SITE_NAME.split(" ");
const secondPart = rest.join(" ");

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='fixed header w-full z-10'>
      <div className="container mx-auto header-content">
        <div className="hidden details container mx-auto flex  p-6 lg:px-8 justify-end">

          <div className="ct-dt flex flex-row ">
            <div className="ct ph flex items-center">
              <FontAwesomeIcon icon={faPhone} className=" size-6" />
              <ul>
                <li className="sp-contact-email">9915360666</li>
              </ul>
            </div>

            <div className="ct email flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className=" size-6" />
              <ul>

                <li className="sp-contact-email">ksagrotech5@gmail.com</li>
              </ul>
            </div>

          </div>

        </div>
        <nav aria-label="Global" className="mx-auto flex items-center justify-between p-6 lg:px-8 backdrop-blur-lg transform-gpu will-change-[backdrop-filter]">

          <div className="flex lg:hidden order-1">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="flex lg:flex-1">
            <div className={`-m-1.5 p-1.5`}>
              {LOGO_SRC ? (
                <Link href="/" className="logo">
                  <Image
                    src={LOGO_SRC}
                    alt={LOGO_ALT}
                    width={70}
                    height={70}
                  />
                </Link>
              ) : (
                <Link href="/" className="logo">
                  <span className="font-bold drop-shadow-xl">
                    <span className="first-name">{firstPart} </span>
                    <span className="second-name">{secondPart}</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Link href="/" className=" text-base font-bold text-gray-950">
              Home
            </Link>
            <Link href="/about" className=" text-base font-bold text-gray-950">
              About
            </Link>
            <Link href="/contact" className=" text-base font-bold text-gray-950">
              Contact
            </Link>
          </PopoverGroup>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link
                href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  alt=""
                  src={LOGO_SRC}
                  className="h-8 w-auto"
                  width={70}
                  height={70}
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
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
      </div>
    </header>
  )
}
