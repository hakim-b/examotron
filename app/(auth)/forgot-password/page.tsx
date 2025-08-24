import ForgotPassForm from "@/components/forgot-pass-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ForgotPassword() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <ForgotPassForm />
      </CardContent>
    </Card>
  );
}

export default ForgotPassword;
