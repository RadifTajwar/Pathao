"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
export const Navbar = () => {
    const [upper, setUpper] = useState(false);
    const pathName = usePathname();
    useEffect(() => {
        if (pathName == '/') {
            setUpper(true);
        }
        else {
            setUpper(false);
        }
    }, [pathName, upper]);

    return (
        <nav className=" px-6 flex items-center justify-between">
            {
                upper && (
                    <>

                        <div className="flex-col hidden lg:flex">
                            <h1 className="text-2xl font-semibold">
                                Home
                            </h1>
                            <p className="text-muted-foreground">Monitor all of your projects and tasks</p>

                        </div>
                        <MobileSidebar />
                        <UserButton />
                    </>
                )}
            
        </nav>
    );
};