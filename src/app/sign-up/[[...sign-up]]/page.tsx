import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/"/>
    </div>
  );
}

export default SignUpPage;
