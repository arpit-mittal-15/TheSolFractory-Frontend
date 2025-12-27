import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

export default function GoogleButtonLink({
  onSuccess,
}: {
  onSuccess: (credentialResponse: CredentialResponse) => void;
}) {
  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => alert("Google login failed")}
        theme="outline"
        size="large"
        width="280"
      />
    </div>
  );
}
