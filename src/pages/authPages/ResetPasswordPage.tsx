import Body from "../../components/Body";
import PasswordResetForm from "../../components/authComponents/PasswordResetForm";

export default function ResetPasswordPage() {
  return (
    <>
      <Body>
        <div className="container">
          <PasswordResetForm />
        </div>
      </Body>
    </>
  );
}
