import LoginForm from "../../components/authComponents/LoginForm";
import Body from "../../components/Body";

export default function LoginPage() {
  return (
    <>
      <Body>
        <div className="container">
          <LoginForm />
        </div>
      </Body>
    </>
  );
}
