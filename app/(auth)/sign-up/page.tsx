import SignUpForm from "@/components/sign-up-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
};

export default SignUp;
