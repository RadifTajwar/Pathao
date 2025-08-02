"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Home() {

  const { data: session ,status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session && status !== "loading") {
            router.push("/sign-in");
        } else {
            console.log("Session data:", session);
        }
    }, [session, router,status]);

  return (
    <div className="">
      This is the Home page.
    </div>
  );
}
