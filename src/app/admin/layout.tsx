import { isAdminAuthenticated } from "@/lib/auth";
import { ThemeProvider } from "@/components/admin/ThemeProvider";
import { LanguageProvider } from "@/components/admin/LanguageProvider";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = await isAdminAuthenticated();

  // If not authenticated, render children without dashboard chrome
  if (!isAuthed) {
    return (
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex bg-[#0A0A0B] transition-colors">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0B]">
            <Header />
            <main className="flex-1 p-4 lg:p-8 bg-[#0A0A0B]">{children}</main>
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
