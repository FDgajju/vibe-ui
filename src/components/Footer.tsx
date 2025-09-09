import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixmt-10 border-t border-gray-200 bg-white/70">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} VibeUI. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <a href="/" className="hover:text-gray-900">
            Privacy
          </a>
          <a href="/" className="hover:text-gray-900">
            Terms
          </a>
          <a href="/" className="hover:text-gray-900">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
