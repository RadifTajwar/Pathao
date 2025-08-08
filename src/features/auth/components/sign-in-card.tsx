
import { FcGoogle } from "react-icons/fc";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,

    FormMessage,
} from "@/components/ui/form";




const formSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});



export const SignInCard = () => {

    
    

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {

        const user = {
            email: values.email,

            name: values.email.split("@")[0],
        };
        localStorage.setItem("user", JSON.stringify(user));

        redirect("/");
    };

   

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription>
                    By signing in, you agree to our{" "}
                    <Link href="#">
                        <span className="text-blue-700">Privacy Policy</span>
                    </Link>{" "}
                    and{" "}
                    <Link href="#">
                        <span className="text-blue-700">Terms of Service</span>
                    </Link>{" "}
                </CardDescription>
            </CardHeader>

            <div className="px-7 mb-2">
                <Separator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>

                                        <Input

                                            type="email"
                                            placeholder="Enter email address"
                                            {...field}
                                        />
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

                                        <Input
                                            type="password"
                                            placeholder="Enter password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={false} size="lg" className="w-full">Login</Button >
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <Separator />
            </div>

            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FcGoogle className="mr-2 size-5" />
                    Login With Google
                </Button>
            </CardContent>

            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Don&apos;t have an account?
                    <Link href="/sign-up">
                        <span className="text-blue-700"> Sign Up</span>
                    </Link>

                </p>
            </CardContent>
        </Card>
    )
};
