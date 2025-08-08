"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


type LocalUser = {
    name: string;
    email: string;
    password: string;
};

const USERS_KEY = "demo-users";
const LOGGEDIN_KEY = "demo-loggedin";


function getAllLocalUsers(): LocalUser[] {
    if (typeof window === "undefined") return [];
    const usersStr = localStorage.getItem(USERS_KEY);
    try {
        return usersStr ? (JSON.parse(usersStr) as LocalUser[]) : [];
    } catch {
        return [];
    }
}


function saveAllLocalUsers(users: LocalUser[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


function setLoggedInUser(user: LocalUser) {
    if (typeof window === "undefined") return;
    localStorage.setItem(LOGGEDIN_KEY, JSON.stringify(user));
}





const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});


export const SignUpCard = () => {
    const router = useRouter();
   

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    
    const onSubmit = (values: LocalUser) => {
        const users = getAllLocalUsers();
        const alreadyExists = users.some((u) => u.email === values.email);
        if (alreadyExists) {
            toast.error("Email is already registered.");
            return;
        }
        saveAllLocalUsers([...users, values]);
        setLoggedInUser(values);

        toast.success("Sign up successful!");
        setTimeout(() => {
            router.push("/");
        }, 500);
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Create an Account</CardTitle>
            </CardHeader>
            <div className="px-7 mb-2">
                <Separator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter email address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full">
                            Signup
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Already have an account?
                    <Link href="/sign-in">
                        <span className="text-blue-700"> Sign In</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};
