"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    { href: "/admin", label: t.dashboard, icon: FiGrid },
    { href: "/admin/orders", label: t.orders, icon: FiShoppingBag },
    { href: "/admin/customers", label: t.customers, icon: FiUsers },
    { href: "/admin/settings", label: t.settings, icon: FiSettings },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition bg-white">
            <img
              src="/ZenvyFashion-Logo.png"
              alt="Zenvy Fashion"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-white font-bold text-lg leading-tight">
              Zenvy Fashion
            </h1>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                active
                  ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                size={20}
                className={active ? "" : "group-hover:scale-110 transition"}
              />
              <span className="font-medium text-sm">{item.label}</span>
              {active && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-red-500/20 transition disabled:opacity-50"
        >
          <FiLogOut size={20} />
          <span className="font-medium text-sm">
            {loggingOut ? "..." : t.logout}
          </span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg"
        aria-label="Open menu"
      >
        <FiMenu size={20} />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 bg-slate-900 flex-col border-r border-slate-800">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 w-64 h-full bg-slate-900 z-50 flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
              aria-label="Close menu"
            >
              <FiX size={18} />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
