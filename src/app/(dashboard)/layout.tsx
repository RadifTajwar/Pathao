"use client";
import { useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const showNavbar = pathname === "/";
  const router = useRouter();


  const { data: session, status } = useSession();

  useEffect(() => {

    const user =
      typeof window !== "undefined"
        ? localStorage.getItem("user")
        : null;

    
    if (!session && status !== "loading" && !user) {
      router.push("/sign-in");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen h-full">
            {showNavbar && <Navbar />}
            <main className="h-full  px-0 flex flex-col">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
