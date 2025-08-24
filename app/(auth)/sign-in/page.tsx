import SignInForm from "@/components/sign-in-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function SignIn() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}

export default SignIn;
