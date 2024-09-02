import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <SignIn signUpUrl="/sign-up" fallbackRedirectUrl="/" />
      </div>
    </>
  );
}

export default SignInPage;
