import React from "react";
import { CardWrapper } from "./card-wrapper";
import { RxExclamationTriangle } from "react-icons/rx";

export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Oops! Something went wrong!"
    >
      <RxExclamationTriangle className="mx-auto text-destructive" />
    </CardWrapper>
  );
};
