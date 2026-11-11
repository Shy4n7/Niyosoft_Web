export function EmailText({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  return (
    <>
      {user}
      <wbr />@{domain}
    </>
  );
}
