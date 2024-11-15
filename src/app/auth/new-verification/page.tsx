import { Suspense } from "react";
import { NewVerificationForm } from "@/components/auth/new-verfication-form";

const NewVerificationPage = () => {
  return (
    <Suspense>
      <NewVerificationForm />;
    </Suspense>
  );
};

export default NewVerificationPage;
