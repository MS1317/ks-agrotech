'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function WhatsappButton() {
    return (
        <a
            href="https://wa.me/919915360666"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer group"
            aria-label="Chat on WhatsApp"
        >
            <FontAwesomeIcon icon={faWhatsapp} className="w-8 h-8" />
            <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-lg shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Chat with us!
            </span>
        </a>
    );
}
