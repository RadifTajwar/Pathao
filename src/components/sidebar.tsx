import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/navigation";
export const Sidebar = () => {
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
            <Image src="/logo.svg" alt="logo" width={50} height={48}>
            
            </Image>
            </Link>
            <Separator className="my-4"/>

            <Navigation/>
        </aside>
    );
};