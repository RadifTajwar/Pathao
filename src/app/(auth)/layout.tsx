import Image from "next/image";
import {Button} from "@/components/ui/button";
interface SignInLayoutProps {
    children: React.ReactNode;
}


const SignInLayout=({children}:SignInLayoutProps)=>{

    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                        <Image src="/logo.svg" alt="logo" width={100} height={56} />
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" >
                                Sign Up
                            </Button>
                        </div>
                </nav>

                <div className="flex flex-col items-center justify-center pt-4 md:pt-14">

            {children}
                </div>
                
            </div>
        </main>
    );
}

export default SignInLayout;