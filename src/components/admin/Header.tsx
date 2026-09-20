"use client";

import { FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

export default function Header({ title }: { title?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0A0A0B]/80 border-b border-[#2A2A2E]">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center gap-4 ml-12 lg:ml-0">
          <h1 className="text-lg lg:text-xl font-bold text-[#F5F3F0]">
            {title || ""}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111114] border border-[#2A2A2E] hover:border-[#E8748A]/40 transition text-[#F5F3F0]"
            aria-label="Toggle language"
          >
            <FiGlobe size={16} />
            <span className="text-xs font-bold">
              {lang === "bn" ? "বাং" : "EN"}
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-[#111114] border border-[#2A2A2E] hover:border-[#E8748A]/40 transition flex items-center justify-center text-[#F5F3F0]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
