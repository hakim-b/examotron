"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Icon } from "@iconify/react";
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      router.push("/sign-in");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-6 w-full" type="submit">
          Sign up
        </Button>
      </form>
      <br />
      <div className="flex items-center justify-center gap-2">
        <Separator className="w-36" orientation="horizontal" />
        <span className="text-medium">OR</span>
        <Separator className="w-36" orientation="horizontal" />
      </div>
      <br />
      <Button
        onClick={() =>
          signIn("google", { callbackUrl: window.location.origin })
        }
        className="w-full"
      >
        <Icon icon="devicon:google" /> &nbsp;&nbsp; Continue with Google
      </Button>
      <p className="mt-2 text-center text-sm text-gray-600">
        If you already have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-in">
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
