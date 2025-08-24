"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      setSuccess(false);
      setIsLoading(true);
      await sendPasswordResetEmail(auth, values.email);
      setSuccess(true);
      form.reset();
    } catch (error: any) {
      console.error(error);
      setError(
        error.message || "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && (
          <p className="text-sm text-green-500">
            If an account exists with this email, you will receive a password
            reset link shortly. Please check your inbox and spam folder.
          </p>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={!form.watch("email") || isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Email"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPassForm;
