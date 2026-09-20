"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "bn" | "en";

export interface TranslationDict {
  // Sidebar
  dashboard: string;
  orders: string;
  customers: string;
  settings: string;
  logout: string;

  // Dashboard
  overview: string;
  dashboardSubtitle: string;
  totalOrders: string;
  pendingOrders: string;
  confirmedOrders: string;
  totalRevenue: string;
  recentOrders: string;
  today: string;
  awaitingConfirmation: string;
  shipped: string;
  todayRevenue: string;

  // Chart
  weeklyOrders: string;
  weeklyOrdersSubtitle: string;

  // Quick Insights
  quickStats: string;
  avgOrderValue: string;
  completedOrders: string;
  cancelledOrders: string;

  // Orders Page
  allOrders: string;
  all: string;
  pending: string;
  processing: string;
  shippedStatus: string;
  completed: string;
  cancelled: string;
  searchOrders: string;

  // Order Detail
  orderDetails: string;
  customerInfo: string;
  orderItems: string;
  paymentMethod: string;
  status: string;
  total: string;
  note: string;
  confirmOrder: string;
  sendToCourier: string;
  markDelivered: string;
  cancelOrder: string;

  // Common
  loading: string;
  noOrders: string;
  viewAll: string;
  copy: string;
  copied: string;
  save: string;
  cancel: string;
}

const translations: Record<Language, TranslationDict> = {
  bn: {
    dashboard: "ড্যাশবোর্ড",
    orders: "অর্ডার",
    customers: "কাস্টমার",
    settings: "সেটিংস",
    logout: "লগআউট",

    overview: "ওভারভিউ",
    dashboardSubtitle: "আপনার স্টোরের সম্পূর্ণ ওভারভিউ",
    totalOrders: "মোট অর্ডার",
    pendingOrders: "পেন্ডিং",
    confirmedOrders: "কনফার্মড",
    totalRevenue: "মোট বিক্রয়",
    recentOrders: "সাম্প্রতিক অর্ডার",
    today: "আজ",
    awaitingConfirmation: "কনফার্মের অপেক্ষায়",
    shipped: "শিপড",
    todayRevenue: "আজ",

    weeklyOrders: "সাপ্তাহিক অর্ডার",
    weeklyOrdersSubtitle: "শেষ ৭ দিনে অর্ডারের সংখ্যা",

    quickStats: "দ্রুত পরিসংখ্যান",
    avgOrderValue: "গড় অর্ডার মূল্য",
    completedOrders: "সম্পন্ন অর্ডার",
    cancelledOrders: "বাতিল",

    allOrders: "সব অর্ডার",
    all: "সব",
    pending: "পেন্ডিং",
    processing: "প্রসেসিং",
    shippedStatus: "শিপড",
    completed: "সম্পন্ন",
    cancelled: "বাতিল",
    searchOrders: "অর্ডার খুঁজুন...",

    orderDetails: "অর্ডার বিস্তারিত",
    customerInfo: "কাস্টমার তথ্য",
    orderItems: "অর্ডারকৃত পণ্য",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    status: "স্ট্যাটাস",
    total: "মোট",
    note: "নোট",
    confirmOrder: "অর্ডার কনফার্ম",
    sendToCourier: "কুরিয়ারে পাঠান",
    markDelivered: "ডেলিভারড",
    cancelOrder: "বাতিল",

    loading: "লোড হচ্ছে...",
    noOrders: "কোনো অর্ডার নেই",
    viewAll: "সব দেখুন",
    copy: "কপি",
    copied: "কপি হয়েছে!",
    save: "সেভ",
    cancel: "বাতিল",
  },
  en: {
    dashboard: "Dashboard",
    orders: "Orders",
    customers: "Customers",
    settings: "Settings",
    logout: "Logout",

    overview: "Overview",
    dashboardSubtitle: "Complete overview of your store",
    totalOrders: "Total Orders",
    pendingOrders: "Pending",
    confirmedOrders: "Confirmed",
    totalRevenue: "Total Revenue",
    recentOrders: "Recent Orders",
    today: "Today",
    awaitingConfirmation: "Awaiting confirmation",
    shipped: "Shipped",
    todayRevenue: "Today",

    weeklyOrders: "Weekly Orders",
    weeklyOrdersSubtitle: "Order count in last 7 days",

    quickStats: "Quick Stats",
    avgOrderValue: "Avg Order Value",
    completedOrders: "Completed",
    cancelledOrders: "Cancelled",

    allOrders: "All Orders",
    all: "All",
    pending: "Pending",
    processing: "Processing",
    shippedStatus: "Shipped",
    completed: "Completed",
    cancelled: "Cancelled",
    searchOrders: "Search orders...",

    orderDetails: "Order Details",
    customerInfo: "Customer Info",
    orderItems: "Order Items",
    paymentMethod: "Payment Method",
    status: "Status",
    total: "Total",
    note: "Note",
    confirmOrder: "Confirm Order",
    sendToCourier: "Send to Courier",
    markDelivered: "Mark Delivered",
    cancelOrder: "Cancel",

    loading: "Loading...",
    noOrders: "No orders yet",
    viewAll: "View All",
    copy: "Copy",
    copied: "Copied!",
    save: "Save",
    cancel: "Cancel",
  },
};

interface LanguageContextValue {
  lang: Language;
  t: TranslationDict;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "bn",
  t: translations.bn,
  toggleLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("bn");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("zenvy_admin_lang") as Language | null;
    if (stored === "bn" || stored === "en") {
      setLang(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("zenvy_admin_lang", lang);
  }, [lang, mounted]);

  const toggleLanguage = () => {
    setLang((l) => (l === "bn" ? "en" : "bn"));
  };

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
