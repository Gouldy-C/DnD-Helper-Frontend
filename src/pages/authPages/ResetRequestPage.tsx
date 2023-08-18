import Body from "../../components/Body";
import RequestResetForm from "../../components/authComponents/RequestResetForm";

export default function ResetRequestPage() {
  return (
    <>
      <Body>
        <div className="container">
          <RequestResetForm />
        </div>
      </Body>
    </>
  );
}
