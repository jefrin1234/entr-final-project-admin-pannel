import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-800 py-8 px-4 sm:px-10 lg:px-20">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-white text-lg font-semibold">
          &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-6">
          <a href="/privacy" className="text-gray-400 hover:text-white transition duration-200">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white transition duration-200">
            Terms of Service
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white transition duration-200">
            Contact Us
          </a>
        </div>
        <div className="mt-4 sm:mt-0 text-gray-400 text-sm">
          Follow us on:
          <a href="/facebook" className="ml-2 hover:text-white transition duration-200">
            Facebook
          </a>
          <a href="/twitter" className="ml-2 hover:text-white transition duration-200">
            Twitter
          </a>
          <a href="/linkedin" className="ml-2 hover:text-white transition duration-200">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
